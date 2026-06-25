export type ProductByClientPort = {
  productId: number;
  productName: string;
  hasPermissions: boolean;
  active: boolean;
  private: boolean;
};

export type GetProductByClientPort = () => Promise<ProductByClientPort[]>;
