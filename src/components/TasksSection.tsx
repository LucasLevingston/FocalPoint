'use client';

import { TaskType } from '@/types/TaskType';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast';

interface TasksSectionProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({ tasks, setTasks }) => {
  const toggleTaskCheck = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, check: !task.check } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.error('Tarefa deletada.');
  };

  return (
    <div className="border sm:w-[450px] w-[272px] sm:min-h-[446px] min-h-[180px] rounded-2xl flex justify-center p-8 flex-col items-center gap-6 border-[#D7DDE9]">
      <h2 className="text-black/55">Suas Tarefas de hoje</h2>
      {tasks
        .filter((task) => !task.check)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => toggleTaskCheck(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      <h2 className="text-black/55">Tarefas finalizadas</h2>
      {tasks
        .filter((task) => task.check)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => toggleTaskCheck(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
    </div>
  );
};

export default TasksSection;
