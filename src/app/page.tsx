'use client';

import Header from '../components/Header';
import TasksSection from '../components/TasksSection';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { newTaskSchema } from '../schemas/newTaskSchema';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/user-hooks';

export default function Home() {
  const { user, getUser, setTasks } = useUser();
  const [newTaskName, setNewTaskName] = useState('');
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };

    fetchData();
  }, [getUser]);

  const handleAddTask = () => {
    try {
      newTaskSchema.parse({ name: newTaskName });

      const newTask = {
        id: user.tasks.length + 1,
        name: newTaskName,
        check: false,
      };

      setTasks([...user.tasks, newTask]);

      setNewTaskName('');
      setError('');
      setIsDialogOpen(false);
      toast.success('Tarefa adicionada com sucesso!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
    }
  };

  return (
    <div className="grid bg-white  items-center justify-items-center sm:gap-16 gap-4 sm:py-6 p-6 sm:px-14 ">
      <Header />
      <div className="min-h-screen flex flex-col gap-6">
        <TasksSection tasks={user.tasks} setTasks={setTasks} />{' '}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger
            className="sm:w-[450px] w-[272px] justify-center flex items-center text-white bg-gradient-to-r from-[#0796D3] to-[#53C0F0] rounded-md h-[51px]"
            onClick={() => setIsDialogOpen(true)}
          >
            Adicionar nova tarefa
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white shadow-[#1018282E] sm:w-[450px] w-full sm:h-[286px] h-screen gap-8 flex flex-col">
            <AlertDialogTitle className="text-2xl">Nova tarefa</AlertDialogTitle>
            <div className="flex flex-col gap-2">
              <p className="text-black font-semibold">Título</p>
              <input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Digite"
                className={`p-4 gap-4 border rounded-lg w-full ${
                  error ? 'border-red-500' : 'border-[#D7DDE9]'
                }`}
              />
              {error && <p className="text-red-500 mt-1">{error}</p>}
            </div>
            <div className="w-full flex sm:flex-row flex-col-reverse gap-4 justify-center">
              <AlertDialogCancel
                className="sm:w-[185px] w-full h-[51px] bg-[#E7EEFB] border-[#E7EEFB]"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </AlertDialogCancel>
              <Button
                className="bg-gradient-to-r from-[#0796D3] to-[#53C0F0] sm:w-[185px] w-full h-[51px]"
                onClick={handleAddTask}
              >
                Adicionar
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
