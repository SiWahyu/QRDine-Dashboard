export interface TableType {
  id: number;
  number: string;
  token: string;
  qr_url: string;
}

export interface TableResponse {
  data: TableType[];
}
