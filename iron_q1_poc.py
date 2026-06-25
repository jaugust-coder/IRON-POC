#!/usr/bin/env python3
"""
IRON POC — Q1 Engine: Therapeutic Area Market Intelligence Report

Usage:
    python iron_q1_poc.py --ta copd
    python iron_q1_poc.py --ta cll
"""

import argparse
import sys

from google.cloud import bigquery

# ============================================================
# TA Configurations
# ============================================================

COPD_TRELEGY_CONFIG = {
    "ta_id": "copd_trelegy_2026",
    "drug_name": "Trelegy Ellipta",
    "drug_generic": "fluticasone furoate/umeclidinium/vilanterol",
    "indication": "COPD",
    "cohort_design": "parallel",
    "eligible_pop_type": "derived_estimate",

    "step_map": {
        "universe":  {"step_name": "STEP 1", "group": "COHORT A"},
        "treated":   {"step_name": "STEP 2", "group": "COHORT A"},
        "untreated": {"step_name": "STEP 2", "group": "COHORT B"},
    },

    "tables": {
        "step_summary": "purplelab-dev.TMP_JOCE.IRON_POC_STEP_SUM_COPD",
        "by_year":      "purplelab-dev.TMP_JOCE.IRON_POC_BY_YEAR_COPD",
        "rx_meas":      "purplelab-dev.TMP_JOCE.IRON_POC_RX_MEAS_SUM_COPD",
    },

    "rx_meas_drug_filter": "Trelegy Ellipta",

    "eos_cohort_available": True,

    "dual_count_always_explain": False,
    "dual_count_explanation": (
        "Rx Measurement counts reflect a broader population window. "
        "The P&MN Step count is a point-in-time snapshot of the confirmed pathway."
    ),

    "data_window_pmn":     "January 2017 – January 2026",
    "data_window_rx_meas": "May 2023 – March 2026",

    "drug_approval_year": 2017,
    "patent_cliff_year":  2025,
    "prior_line_trend_flag": False,
    "multi_indication": False,

    "eligible_range_display": True,
}


CLL_JAYPIRCA_CONFIG = {
    "ta_id": "cll_jaypirca_2026",
    "drug_name": "Jaypirca",
    "drug_generic": "pirtobrutinib",
    "indication": "CLL",
    "cohort_design": "sequential",
    "eligible_pop_type": "claims_exact",

    "step_map": {
        "universe":  {"step_name": "STEP 1",  "group": "COHORT A"},
        "step2":     {"step_name": "STEP 2",  "group": "COHORT A"},
        "step3":     {"step_name": "STEP 3",  "group": "COHORT A"},
        "treated":   {"step_name": "STEP 4A", "group": "COHORT A"},
        "untreated": {"step_name": "STEP 4B", "group": "COHORT B"},
    },

    "tables": {
        "step_summary": "purplelab-dev.TMP_JOCE.IRON_POC_STEP_SUM_CLL",
        "by_year":      "purplelab-dev.TMP_JOCE.IRON_POC_BY_YEAR_CLL",
        "rx_meas":      "purplelab-dev.TMP_JOCE.IRON_POC_RX_MEAS_SUM_CLL",
    },

    "rx_meas_drug_filter": "Jaypirca",

    "eos_cohort_available": False,

    "dual_count_always_explain": True,
    "dual_count_explanation": (
        "Rx Measurement counts reflect a broader 'ever-treated' CLL population "
        "across the full measurement window. The P&MN Step 4A count (894) is a "
        "point-in-time snapshot of Jaypirca-treated patients in the confirmed "
        "sequential pathway. Both are valid — they answer different questions."
    ),

    "data_window_pmn":     "January 2017 – January 2026",
    "data_window_rx_meas": "May 2023 – March 2026",

    "drug_approval_year": 2023,
    "patent_cliff_year":  None,
    "prior_line_trend_flag": True,
    "multi_indication": False,
}


TA_REGISTRY = {
    "copd": COPD_TRELEGY_CONFIG,
    "cll":  CLL_JAYPIRCA_CONFIG,
}

# ============================================================
# BigQuery Q1 Queries
# ============================================================

Q1_SQL_COPD = """
WITH
steps AS (
  SELECT
    MAX(CASE WHEN Step_Name='STEP 1' AND Group_Name='COHORT A' THEN Patients END) AS universe_N,
    MAX(CASE WHEN Step_Name='STEP 2' AND Group_Name='COHORT A' THEN Patients END) AS treated_N,
    MAX(CASE WHEN Step_Name='STEP 2' AND Group_Name='COHORT B' THEN Patients END) AS untreated_N
  FROM `{step_summary}`
  WHERE Data_Source = 'OPEN/CLOSED'
),
rx AS (
  SELECT
    SUM(Patients)        AS rx_meas_patients,
    SUM(TRx_written)     AS rx_meas_trx,
    SUM(NRx_written)     AS rx_meas_nbrx,
    SUM(TRx_dispensed_)  AS rx_meas_dispensed,
    ROUND(SUM(TRx_dispensed_) / NULLIF(SUM(TRx_written),0) * 100, 1) AS fill_rate_pct
  FROM `{rx_meas}`
  WHERE Medication_Name = '{drug_filter}'
),
rx_market AS (
  SELECT
    SUM(Patients)    AS rx_meas_total_market_patients,
    SUM(TRx_written) AS rx_meas_total_market_trx
  FROM `{rx_meas}`
  WHERE Medication_Name IS NOT NULL
),
q1 AS (
  SELECT
    s.universe_N,
    s.treated_N,
    s.untreated_N,
    r.rx_meas_patients,
    r.rx_meas_trx,
    r.rx_meas_nbrx,
    r.rx_meas_dispensed,
    r.fill_rate_pct,
    m.rx_meas_total_market_patients,
    m.rx_meas_total_market_trx,
    ROUND(s.treated_N / s.universe_N * 100, 3)          AS pen_universe_pct,
    s.universe_N - s.treated_N                           AS untreated_eligible_N,
    ROUND((s.universe_N - s.treated_N) / NULLIF(s.treated_N,0), 0) AS untreated_ratio,
    r.rx_meas_patients                                   AS rx_meas_N,
    ROUND(r.rx_meas_patients / NULLIF(s.treated_N, 0), 1) AS dual_count_ratio,
    CASE
      WHEN ROUND(r.rx_meas_patients / NULLIF(s.treated_N, 0), 1) >= 3.0
      THEN TRUE ELSE FALSE
    END AS dual_count_flag,
    ROUND(r.rx_meas_patients / NULLIF(m.rx_meas_total_market_patients, 0) * 100, 1)
      AS drug_market_share_pct
  FROM steps s
  CROSS JOIN rx r
  CROSS JOIN rx_market m
)
SELECT * FROM q1
"""


Q1_SQL_CLL = """
WITH
steps AS (
  SELECT
    MAX(CASE WHEN Step_Name='STEP 1'  AND Group_Name='COHORT A' THEN Patients END) AS universe_N,
    MAX(CASE WHEN Step_Name='STEP 2'  AND Group_Name='COHORT A' THEN Patients END) AS step2_N,
    MAX(CASE WHEN Step_Name='STEP 3'  AND Group_Name='COHORT A' THEN Patients END) AS step3_N,
    MAX(CASE WHEN Step_Name='STEP 4A' AND Group_Name='COHORT A' THEN Patients END) AS treated_N,
    MAX(CASE WHEN Step_Name='STEP 4B' AND Group_Name='COHORT B' THEN Patients END) AS prior_line_total_N
  FROM `{step_summary}`
  WHERE Data_Source = 'OPEN/CLOSED'
),
rx AS (
  SELECT
    SUM(Patients)        AS rx_meas_patients,
    SUM(TRx_written)     AS rx_meas_trx,
    SUM(NRx_written)     AS rx_meas_nbrx,
    SUM(TRx_dispensed_)  AS rx_meas_dispensed,
    ROUND(SUM(TRx_dispensed_) / NULLIF(SUM(TRx_written),0) * 100, 1) AS fill_rate_pct
  FROM `{rx_meas}`
  WHERE Medication_Name = '{drug_filter}'
),
rx_market AS (
  SELECT
    SUM(Patients)    AS rx_meas_total_market_patients,
    SUM(TRx_written) AS rx_meas_total_market_trx
  FROM `{rx_meas}`
  WHERE Medication_Name IS NOT NULL
),
q1 AS (
  SELECT
    s.universe_N,
    s.step2_N,
    s.step3_N,
    s.treated_N,
    s.prior_line_total_N,
    r.rx_meas_patients,
    r.rx_meas_trx,
    r.rx_meas_nbrx,
    r.rx_meas_dispensed,
    r.fill_rate_pct,
    m.rx_meas_total_market_patients,
    m.rx_meas_total_market_trx,
    ROUND(s.treated_N / s.universe_N * 100, 3)          AS pen_universe_pct,
    ROUND(s.treated_N / s.step3_N * 100, 1)             AS pen_eligible_pct,
    s.step3_N - s.treated_N                              AS untreated_eligible_N,
    ROUND((s.step3_N - s.treated_N) / NULLIF(s.treated_N,0), 0) AS untreated_ratio,
    r.rx_meas_patients                                   AS rx_meas_N,
    ROUND(r.rx_meas_patients / NULLIF(s.treated_N, 0), 1) AS dual_count_ratio,
    CASE
      WHEN ROUND(r.rx_meas_patients / NULLIF(s.treated_N, 0), 1) >= 3.0
      THEN TRUE ELSE FALSE
    END AS dual_count_flag,
    ROUND(r.rx_meas_patients / NULLIF(m.rx_meas_total_market_patients, 0) * 100, 1)
      AS jaypirca_market_share_pct,
    ROUND(s.step2_N / s.universe_N * 100, 1)   AS step2_conversion_pct,
    ROUND(s.step3_N / s.step2_N * 100, 1)      AS step3_conversion_pct,
    ROUND(s.treated_N / s.step3_N * 100, 1)    AS step4_conversion_pct
  FROM steps s
  CROSS JOIN rx r
  CROSS JOIN rx_market m
)
SELECT * FROM q1
"""


Q1_QUERIES = {
    "copd": Q1_SQL_COPD,
    "cll":  Q1_SQL_CLL,
}


# ============================================================
# Helpers
# ============================================================

def fmt(n):
    """Format a number with commas, or return 'N/A' if None."""
    if n is None:
        return "N/A"
    if isinstance(n, float):
        return f"{n:,.1f}"
    return f"{n:,}"


def pct(v):
    """Format a percentage value."""
    if v is None:
        return "N/A"
    return f"{v}%"


def header(text, width=70):
    """Print a section header."""
    print()
    print("=" * width)
    print(f"  {text}")
    print("=" * width)


def subheader(text):
    """Print a subsection header."""
    print(f"\n--- {text} ---")


def kv(label, value, indent=2):
    """Print a key-value pair."""
    pad = " " * indent
    print(f"{pad}{label:<45} {value}")


# ============================================================
# Query execution
# ============================================================

def run_q1_query(config):
    """Execute the Q1 SQL for the given TA config and return the row dict."""
    ta_key = config["ta_id"].split("_")[0]
    sql_template = Q1_QUERIES[ta_key]

    sql = sql_template.format(
        step_summary=config["tables"]["step_summary"],
        rx_meas=config["tables"]["rx_meas"],
        drug_filter=config["rx_meas_drug_filter"],
    )

    client = bigquery.Client()
    result = client.query(sql).result()
    rows = list(result)
    if not rows:
        print("ERROR: Q1 query returned no rows.")
        sys.exit(1)
    return dict(rows[0])


# ============================================================
# Report rendering
# ============================================================

def render_report(config, data):
    """Render the full Q1 report for the given TA."""
    drug = config["drug_name"]
    indication = config["indication"]
    cohort_design = config["cohort_design"]

    # ---- Title ----
    print("\n" + "#" * 70)
    print(f"  IRON Q1 — {indication} / {drug} Market Intelligence Report")
    print(f"  Cohort Design: {cohort_design.upper()}")
    print("#" * 70)

    # ---- KPI Banner ----
    render_kpi_banner(config, data)

    # ---- Cohort Funnel ----
    render_funnel(config, data)

    # ---- Rx Measurement Summary ----
    render_rx_measurement(config, data)

    # ---- Dual-Count Check ----
    render_dual_count(config, data)

    # ---- EOS Cohort (if available) ----
    render_eos_bar(config, data)

    # ---- Data Windows ----
    render_data_windows(config)

    # ---- Clinical Context ----
    render_clinical_context(config)

    print("\n" + "=" * 70)
    print("  END OF REPORT")
    print("=" * 70 + "\n")


def render_kpi_banner(config, data):
    """Render the top-level KPI banner."""
    header(f"KPI BANNER — {config['indication']} / {config['drug_name']}")

    kv("Universe (Step 1):", fmt(data.get("universe_N")))
    kv(f"{config['drug_name']} Treated:", fmt(data.get("treated_N")))
    kv("Penetration (Universe):", pct(data.get("pen_universe_pct")))

    if config["cohort_design"] == "sequential":
        kv("Penetration (Eligible Step 3):", pct(data.get("pen_eligible_pct")))
        untreated_n = data.get("untreated_eligible_N")
        print()
        print("  " + "*" * 60)
        print(f"  * WHITESPACE: {fmt(untreated_n)} eligible patients not on {config['drug_name']}")
        print("  " + "*" * 60)
    else:
        untreated_n = data.get("untreated_eligible_N")
        kv("Untreated Eligible:", fmt(untreated_n))

    market_share_key = "drug_market_share_pct" if "drug_market_share_pct" in data else "jaypirca_market_share_pct"
    kv(f"{config['drug_name']} Market Share (Patients):", pct(data.get(market_share_key)))
    kv("Fill Rate:", pct(data.get("fill_rate_pct")))


def render_funnel(config, data):
    """Render the cohort funnel visualization."""
    header("COHORT FUNNEL")

    step_map = config["step_map"]

    if config["cohort_design"] == "sequential":
        steps = [
            ("STEP 1 — Universe",                 data.get("universe_N"), None),
            ("STEP 2 — Filtered",                  data.get("step2_N"),   data.get("step2_conversion_pct")),
            ("STEP 3 — Eligible",                  data.get("step3_N"),   data.get("step3_conversion_pct")),
            (f"STEP 4A — {config['drug_name']} Treated", data.get("treated_N"), data.get("step4_conversion_pct")),
        ]

        max_n = max((s[1] or 0) for s in steps)

        for label, n, conv in steps:
            bar_len = int((n or 0) / max(max_n, 1) * 40)
            bar = "█" * bar_len
            conv_str = f"  ({pct(conv)} conversion)" if conv is not None else ""
            print(f"  {label:<40} {fmt(n):>10}  {bar}{conv_str}")

        print()
        prior_line_n = data.get("prior_line_total_N")
        if prior_line_n is not None:
            print(f"  STEP 4B — Prior-Line Total (Cohort B)    {fmt(prior_line_n):>10}")
    else:
        steps = [
            ("STEP 1 — Universe",                  data.get("universe_N"), None),
            (f"STEP 2A — {config['drug_name']} Treated", data.get("treated_N"), None),
        ]

        max_n = max((s[1] or 0) for s in steps)

        for label, n, _ in steps:
            bar_len = int((n or 0) / max(max_n, 1) * 40)
            bar = "█" * bar_len
            print(f"  {label:<40} {fmt(n):>10}  {bar}")

        untreated_n = data.get("untreated_N") or data.get("untreated_eligible_N")
        if untreated_n is not None:
            print(f"  STEP 2B — Untreated (Cohort B)           {fmt(untreated_n):>10}")

        if config.get("eligible_range_display"):
            subheader("Eligible Range (Derived Estimate)")
            print("  Eligible population is estimated from the universe and treated counts.")
            print(f"  Estimated range: {fmt(data.get('universe_N'))} universe → {fmt(data.get('treated_N'))} treated")


def render_rx_measurement(config, data):
    """Render the Rx Measurement summary."""
    header(f"Rx MEASUREMENT — {config['drug_name']}")

    kv("Patients:", fmt(data.get("rx_meas_patients")))
    kv("TRx Written:", fmt(data.get("rx_meas_trx")))
    kv("NRx Written:", fmt(data.get("rx_meas_nbrx")))
    kv("TRx Dispensed:", fmt(data.get("rx_meas_dispensed")))
    kv("Fill Rate:", pct(data.get("fill_rate_pct")))

    subheader("Market Context")
    kv("Total Market Patients:", fmt(data.get("rx_meas_total_market_patients")))
    kv("Total Market TRx:", fmt(data.get("rx_meas_total_market_trx")))


def render_dual_count(config, data):
    """Render the dual-count explanation block."""
    dual_flag = data.get("dual_count_flag", False)
    always_explain = config.get("dual_count_always_explain", False)

    if not dual_flag and not always_explain:
        return

    header("DUAL-COUNT CHECK")

    ratio = data.get("dual_count_ratio")
    rx_n = data.get("rx_meas_N")
    treated_n = data.get("treated_N")

    kv("Rx Measurement N:", fmt(rx_n))
    kv("P&MN Treated N:", fmt(treated_n))
    kv("Ratio (Rx Meas / P&MN):", f"{ratio}x" if ratio else "N/A")

    if dual_flag:
        print(f"\n  ⚠  DUAL-COUNT FLAG: Ratio {ratio}x ≥ 3.0x threshold")

    print()
    print(f"  EXPLANATION: {config['dual_count_explanation']}")


def render_eos_bar(config, data):
    """Render the EOS cohort bar (skipped if not available)."""
    if not config.get("eos_cohort_available", False):
        return

    header("EOS COHORT BAR")
    print("  [EOS cohort data would render here]")


def render_data_windows(config):
    """Render the data window information."""
    subheader("Data Windows")
    kv("P&MN Window:", config["data_window_pmn"])
    kv("Rx Measurement Window:", config["data_window_rx_meas"])


def render_clinical_context(config):
    """Render NCCN-informed clinical context."""
    subheader("Clinical Context")
    kv("Drug:", f"{config['drug_name']} ({config['drug_generic']})")
    kv("Indication:", config["indication"])
    kv("Approval Year:", str(config["drug_approval_year"]))
    kv("Patent Cliff:", str(config.get("patent_cliff_year") or "N/A"))
    kv("Prior-Line Trend Flag:", str(config.get("prior_line_trend_flag", False)))
    kv("Multi-Indication:", str(config.get("multi_indication", False)))


# ============================================================
# CLI
# ============================================================

def parse_args():
    parser = argparse.ArgumentParser(
        description="IRON POC — Q1 Engine: Therapeutic Area Market Intelligence Report"
    )
    parser.add_argument(
        "--ta",
        required=True,
        choices=list(TA_REGISTRY.keys()),
        help="Therapeutic area to run (e.g., copd, cll)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the SQL without executing",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    config = TA_REGISTRY[args.ta]

    print(f"\n>> IRON Q1 Engine — TA: {config['indication']} / {config['drug_name']}")
    print(f">> Cohort design: {config['cohort_design']}")

    if args.dry_run:
        ta_key = config["ta_id"].split("_")[0]
        sql = Q1_QUERIES[ta_key].format(
            step_summary=config["tables"]["step_summary"],
            rx_meas=config["tables"]["rx_meas"],
            drug_filter=config["rx_meas_drug_filter"],
        )
        print("\n-- DRY RUN: SQL that would be executed --")
        print(sql)
        return

    data = run_q1_query(config)
    render_report(config, data)


if __name__ == "__main__":
    main()
