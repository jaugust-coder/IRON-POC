export const getFileNameWithCriterial = (
  criterial: string,
  name: string = ''
) => {
  const partsName = name.split(/\.(?=[^.]*$)/);
  return `${partsName[0]}-${criterial}.${partsName[1]}`;
};
