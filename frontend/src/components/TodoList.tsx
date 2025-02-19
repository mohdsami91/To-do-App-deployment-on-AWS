import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { Todo } from '../types';

export default function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo created successfully');
      setNewTodo('');
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    createMutation.mutate({ title: newTodo });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Add new todo..."
        />
      </form>

      <ul className="space-y-2">
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateMutation.mutate({
                id: todo.id,
                completed: !todo.completed
              })}
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 