import { ID } from "./variables";

export type ProductRelationState =
  "new" | "remove" | "old" | "created";

export interface ProductRelationItem {
  id: ID;
  state: ProductRelationState;
}

export interface ProductRelationsInput {
  colors?: ProductRelationItem[];
  sizes?: ProductRelationItem[];
}