export interface GetSessionResponse {
  id: string;
  bpm: number;
  note: string;
  confidence: number;
  startTime: Date;
  endTime: Date;
  duration: number;
}

export interface SaveSessionRequest {
  bpm: number;
  note: string;
  confidence: number;
  startTime: Date;
  endTime: Date;
}