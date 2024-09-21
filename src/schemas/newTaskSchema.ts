import { z } from 'zod';

export const newTaskSchema = z.object({
  name: z.string().min(1, 'O título da tarefa não pode estar vazio'),
});
