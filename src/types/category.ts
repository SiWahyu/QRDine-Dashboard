export interface CategoryType {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface CategoryResponse {
  data: CategoryType[];
}
