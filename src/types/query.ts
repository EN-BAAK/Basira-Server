import { ID } from "./variables";

export interface GetSalesParams {
  page?: number;
  limit?: number;
}

export interface CreateSaleData {
  productVariantId: ID;
  quantity: number;
}
