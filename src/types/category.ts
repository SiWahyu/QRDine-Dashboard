export interface CategoryType {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface CategoryResponse {
  data: CategoryType[];
}

export interface CategoryMutationResponse {
  message: string;
  data: CategoryType[];
}
export interface SingleCategoryResponse {
  message?: string;
  data: CategoryType;
}
