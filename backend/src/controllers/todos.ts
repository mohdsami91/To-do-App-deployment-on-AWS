import { Request, Response } from 'express';
import { db } from '../db';
import { todos, NewTodo } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const allTodos = await db.select().from(todos);
    res.json(allTodos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo: NewTodo = req.body;
    const [created] = await db.insert(todos).values(newTodo).returning();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const [updated] = await db
      .update(todos)
      .set(updates)
      .where(eq(todos.id, id))
      .returning();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(todos).where(eq(todos.id, id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}; 