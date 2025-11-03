export interface GetMediaResponse {
  id: string;
  type: string;
  filename: string;
  url: string;
  size: number;
  duration: number;
  createdAt: Date;
}

export interface GetUploadURLResponse {
  mediaId: string;
  url: string;
}

export interface ConfirmMediaUploadRequest {
  type: string;
  filename: string;
  size: string;
  duration: string;
}