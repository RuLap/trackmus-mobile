import { camelToSnake, snakeToCamel } from "@/src/uitls/caseConverter";
import { api } from "@/src/lib/api";
import { GetTaskShortResponse, SaveTaskRequest } from "../types/task";

export const tasksApi = {
  active: async (accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.get('/tasks/active', { headers });
    return snakeToCamel(response) as GetTaskShortResponse[];
  },

  completed: async (accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.get('/tasks/completed', { headers });
    return snakeToCamel(response) as GetTaskShortResponse[];
  },

  getById: async (id: string ,accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.get(`/tasks/${id}`, { headers });
    return snakeToCamel(response) as GetTaskShortResponse;
  },
  
  create: async (body: SaveTaskRequest, accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.post('/tasks', camelToSnake(body), { headers });
    return snakeToCamel(response) as GetTaskShortResponse;
  },

  complete: async (id: string, accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.put(`/tasks/${id}/complete`, undefined, { headers });
    return snakeToCamel(response) as GetTaskShortResponse;
  },

  update: async (id: string, body: SaveTaskRequest, accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.put(`/tasks/${id}`, camelToSnake(body), { headers });
    return snakeToCamel(response) as GetTaskShortResponse;
  },
}