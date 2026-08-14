export interface MenuType {
  id: number;
  category: string;
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
