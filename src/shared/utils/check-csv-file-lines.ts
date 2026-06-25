export const checkCsvFileLines = async (
  buffer: ArrayBuffer
): Promise<number | undefined> => {
  const fileBlob = new Blob([buffer], { type: 'text/plain' });

  try {
    const text = await fileBlob.text();
    const rows = text.split('\n');
    return rows.length;
  } catch (err) {
    throw new Error(`Failed to parse file content: ${err}`);
  }
};
