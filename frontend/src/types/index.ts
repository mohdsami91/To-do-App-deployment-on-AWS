export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewTodo {
  title: string;
  description?: string;
}

export interface UpdateTodo {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
} 