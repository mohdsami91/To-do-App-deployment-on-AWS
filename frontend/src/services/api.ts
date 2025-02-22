import axios from 'axios';
import { Todo, NewTodo, UpdateTodo } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://3.84.39.52:3000/api'
});

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get('/todos');
  return data;
};

export const createTodo = async (todo: NewTodo): Promise<Todo> => {
  const { data } = await api.post('/todos', todo);
  return data;
};

export const updateTodo = async ({ id, ...updates }: UpdateTodo): Promise<Todo> => {
  const { data } = await api.put(`/todos/${id}`, updates);
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
}; 