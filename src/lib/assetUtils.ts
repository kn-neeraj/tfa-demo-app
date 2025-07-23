// Utility function to get the correct asset path based on environment
export const getAssetPath = (assetPath: string) => {
  const basePath = import.meta.env.PROD ? '/selfheal-demo-app' : '';
  return `${basePath}${assetPath}`;
};
