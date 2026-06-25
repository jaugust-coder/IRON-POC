const getPaginationParamsNextUrl = (nextUrl: string) => {
  const paramString = nextUrl.split('?')?.[1];
  if (!paramString) return;

  const urlParams = new URLSearchParams(paramString);
  const sinceId = urlParams.get('sinceId');
  const sortValue = urlParams.get('sortValue');

  return {
    ...(sinceId != null && { sinceId }),
    ...(sortValue != null && { sortValue })
  };
};

export default getPaginationParamsNextUrl;
