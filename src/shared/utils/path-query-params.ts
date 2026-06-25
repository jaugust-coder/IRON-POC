export const pathQueryParams = (
  path: string,
  params: Record<string, string | number | boolean | undefined>
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};
