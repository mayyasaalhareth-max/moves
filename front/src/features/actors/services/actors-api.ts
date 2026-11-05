import { Actor, ActorFormData } from '@/features/actors/types';
import { apiRequest, jsonBody } from '@/services/api-client';

export const getActors = () => apiRequest<Actor[]>('/actors');

export const saveActor = (id: string, actor: ActorFormData) =>
  apiRequest<Actor>(id ? `/actors/${id}` : '/actors', {
    method: id ? 'PUT' : 'POST',
    ...jsonBody(actor),
  });

export const removeActor = (id: string) =>
  apiRequest<unknown>(`/actors/${id}`, { method: 'DELETE' });
