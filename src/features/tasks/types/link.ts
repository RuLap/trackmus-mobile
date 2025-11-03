export interface GetLinkResponse {
  id: string;
  url: string;
  title: string;
  type: string;
  createdAt: Date;
}

export interface SaveLinkRequest {
  title: string;
  type: string;
}