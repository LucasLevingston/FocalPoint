import { create } from 'zustand';
import { UserType } from '../types/UserType';
import axios from 'axios';
import { TaskType } from '@/types/TaskType';

interface UserState {
  user: UserType;
  setUser: (user: UserType) => void;
  setTasks: (tasks: TaskType[]) => void;
  toggleTaskCheck: (id: number) => void;
  getUser: () => Promise<void>;
}

const url = process.env.NEXT_PUBLIC_URL || 'url';

export const useUser = create<UserState>((set) => ({
  user: {
    id: '',
    firstName: '',
    lastName: '',
    tasks: [],
  },

  setUser: (user: UserType) =>
    set(() => ({
      user,
    })),

  setTasks: (tasks: TaskType[]) =>
    set((state) => ({
      user: { ...state.user, tasks },
    })),

  toggleTaskCheck: (id) =>
    set((state) => ({
      user: {
        ...state.user,
        tasks: state.user.tasks.map((task) =>
          task.id === id ? { ...task, check: !task.check } : task
        ),
      },
    })),

  getUser: async () => {
    try {
      const response = await axios.get(url);
      const user: UserType = await response.data;
      set(() => ({
        user,
      }));
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  },
}));
