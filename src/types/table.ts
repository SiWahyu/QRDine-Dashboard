export interface TableType {
  id: number;
  number: string;
  token: string;
  qr_url: string;
}

export interface TableResponse {
  data: TableType[];
}
export interface TableMutationResponse {
  message: string;
  data: TableType[];
}
export interface SingleTableResponse {
  message?: string;
  data: TableType;
}
