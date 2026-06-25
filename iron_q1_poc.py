#!/usr/bin/env python3
"""
IRON Q1 POC — "How large is the patient universe, and what share is currently treated?"
Dupixent in COPD.

Connects to BigQuery (purplelab-dev), runs the Q1 engine query against two
TMP_JOCE tables, then calls Claude to produce a structured insight.

Requirements:
    pip install google-cloud-bigquery anthropic

Auth:
    - BigQuery: uses local gcloud ADC  (gcloud auth application-default login)
    - Anthropic: reads ANTHROPIC_API_KEY env var
"""

import json
import os
import sys
import textwrap

from google.cloud import bigquery
import anthropic

# ── BigQuery config ──────────────────────────────────────────────────────────
BQ_PROJECT = "purplelab-dev"
DATASET = "TMP_JOCE"

TABLE_DUPIXENT_YN = f"{BQ_PROJECT}.{DATASET}.IRON_POC_STEP_SUM_COPD_Dupixent_YN"
TABLE_EOSINO = f"{BQ_PROJECT}.{DATASET}.IRON_POC_STEP_SUM_COPD_EOSINO"

ENGINE_QUERY = f"""
WITH dupixent AS (
  SELECT
    Dupixent_YN,
    Therapy_Step,
    Patient_Count,
    Pct_of_Total
  FROM `{TABLE_DUPIXENT_YN}`
),
eos AS (
  SELECT
    Eos_Cohort,
    Therapy_Step,
    Patient_Count,
    Pct_of_Total
  FROM `{TABLE_EOSINO}`
)
SELECT 'dupixent_yn' AS source_table, CAST(Dupixent_YN AS STRING) AS cohort,
       Therapy_Step, Patient_Count, Pct_of_Total
FROM dupixent
UNION ALL
SELECT 'eos_cohort'  AS source_table, Eos_Cohort AS cohort,
       Therapy_Step, Patient_Count, Pct_of_Total
FROM eos
ORDER BY source_table, cohort, Therapy_Step
"""

# ── Prompt template ──────────────────────────────────────────────────────────
SYSTEM_PROMPT = textwrap.dedent("""\
    You are IRON, an AI analytics engine for pharma commercial teams.
    You answer structured questions about HealthNexus claims data.
    Always ground every number in the data provided — never fabricate figures.
    Use concise, executive-ready language suitable for a brand team slide deck.
""")

USER_PROMPT_TEMPLATE = textwrap.dedent("""\
    ## Question Q1
    "How large is the patient universe, and what share is currently treated?"

    **Brand:** Dupixent
    **Indication:** COPD
    **Data window:** Most recent 12-month claims period in HealthNexus

    ## Engine query results

    The query returned rows from two summary tables.

    ### Table 1 — P&MN Step Summary (Dupixent Y/N)
    Columns: Dupixent_YN, Therapy_Step, Patient_Count, Pct_of_Total

    ```
    {dupixent_rows}
    ```

    ### Table 2 — Eos Cohort Step Summary
    Columns: Eos_Cohort, Therapy_Step, Patient_Count, Pct_of_Total

    ```
    {eos_rows}
    ```

    ## Instructions

    Produce the following output structure in **plain text** (no markdown headers):

    1. **KPI BANNER** — exactly 5 bullet metrics:
       • Total COPD universe (N)
       • Currently treated with Dupixent (N)
       • Untreated ratio (% of universe NOT on Dupixent)
       • Dupixent penetration among all COPD patients (%)
       • Estimated eligible penetration range — what share of the biologic-eligible
         sub-population (e.g. ≥300 eos, Step 3+) is on Dupixent (give a range)

    2. **INSIGHT** — exactly 3 paragraphs:
       a. Anchor the numbers: state the universe size and current Dupixent uptake.
       b. Explain the eligible sub-population: use the eos cohort data to size
          the higher-eos segments and their therapy step distribution.
       c. Commercial implication: what does the gap mean for the brand team?

    3. **WATCH SIGNALS** — exactly 2 bullet points flagging trends or risks
       the brand team should monitor.

    4. **FOLLOW-ON QUESTIONS** — list these three linked questions:
       • Q2: "Which therapy steps have the highest unmet need?"
       • Q3: "What is the eosinophil distribution across the COPD universe?"
       • Q6: "How does Dupixent switching compare to competitor biologics?"
""")


def run_bq_query() -> list[dict]:
    """Execute the engine query and return rows as dicts."""
    client = bigquery.Client(project=BQ_PROJECT)
    print("⏳  Running BigQuery engine query …")
    result = client.query(ENGINE_QUERY).result()
    rows = [dict(row) for row in result]
    print(f"✅  Query returned {len(rows)} rows")
    return rows


def format_rows(rows: list[dict], source: str) -> str:
    """Format rows for a given source_table into a readable text block."""
    filtered = [r for r in rows if r["source_table"] == source]
    if not filtered:
        return "(no rows)"
    lines = []
    for r in filtered:
        lines.append(
            f"  {r['cohort']:>20s} | {r['Therapy_Step']!s:>15s} "
            f"| {r['Patient_Count']:>10,} | {r['Pct_of_Total']:>8.2f}%"
        )
    return "\n".join(lines)


def call_claude(dupixent_text: str, eos_text: str) -> str:
    """Send the prompt to Claude and return the insight text."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌  ANTHROPIC_API_KEY environment variable is not set.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    user_prompt = USER_PROMPT_TEMPLATE.format(
        dupixent_rows=dupixent_text,
        eos_rows=eos_text,
    )

    print("⏳  Calling Claude (claude-sonnet-4-6) …")
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    text = message.content[0].text
    print(f"✅  Claude responded ({message.usage.input_tokens} in / "
          f"{message.usage.output_tokens} out tokens)")
    return text


def main():
    print("=" * 72)
    print("  IRON Q1 POC — Dupixent in COPD")
    print("  Question: How large is the patient universe, and what share")
    print("            is currently treated?")
    print("=" * 72)
    print()

    # 1. Run BQ query
    rows = run_bq_query()

    # 2. Format tables for the prompt
    dupixent_text = format_rows(rows, "dupixent_yn")
    eos_text = format_rows(rows, "eos_cohort")

    print("\n── Raw data (dupixent_yn) ──")
    print(dupixent_text)
    print("\n── Raw data (eos_cohort) ──")
    print(eos_text)
    print()

    # 3. Call Claude
    insight = call_claude(dupixent_text, eos_text)

    # 4. Print the structured output
    print("\n" + "=" * 72)
    print("  IRON Q1 OUTPUT")
    print("=" * 72)
    print()
    print(insight)
    print()
    print("=" * 72)
    print("  End of IRON Q1 POC output")
    print("=" * 72)


if __name__ == "__main__":
    main()
