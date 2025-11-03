import { GetLinkResponse } from "./link";
import { GetMediaResponse } from "./media";
import { GetSessionResponse } from "./session";

export interface GetTaskShortResponse {
  id: string
  title: string;
  targetBpm: number;
  progress: number;
}

export interface GetTaskResponse {
  id: string;
  title: string;
  targetBPM: number;
  sessions: GetSessionResponse[];
  media: GetMediaResponse[];
  links: GetLinkResponse[];
}

export interface SaveTaskRequest {
  title: string;
  targetBPM: number;
}