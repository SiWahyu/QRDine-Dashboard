export interface MenuType {
  id: number;
  category: string;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuResponse {
  data: MenuType[];
}

export interface MenuMutationResponse {
  message: string;
  data: MenuType[];
}

export interface SingleMenuResponse {
  message?: string;
  data: MenuType;
}
