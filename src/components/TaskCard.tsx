'use client';

import React from 'react';
import { TaskType } from '@/types/TaskType';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: TaskType;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`border min-h-14 border-mainGray cursor-pointer gap-4 p-4 flex sm:w-[386px] w-[208px] rounded-lg items-center justify-between ${
        task.check ? '' : 'border-dashed'
      } hover:bg-[#F7F9FD]`}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={task.check}
          className="hidden"
          onChange={onToggle}
        />
        <div
          className={`w-6 h-6 border rounded flex items-center justify-center transition-colors duration-200 ${
            task.check ? 'bg-[#A0DCF6] border-[#0796D3]' : 'border-mainGray'
          }`}
        >
          {task.check && (
            <span className="text-#0796D3 ">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1.5L4.75 9.75L1 6"
                  stroke="#0796D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      </label>
      <p
        className={`w-[80%]  text-left ${
          task.check ? 'text-black/55 line-through' : 'text-black'
        }`}
      >
        {task.name}
      </p>
      <AlertDialog>
        <AlertDialogTrigger className="w-6 h-6">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5H3M3 5H19M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V5H3ZM6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5"
              stroke="#B0BBD1"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white flex flex-col  justify-start sm:justify-between shadow-[#1018282E] sm:w-[450px] w-full sm:h-[286px] h-screen gap-8">
          <AlertDialogTitle className="text-2xl">Deletar tarefa</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que você deseja deletar essa tarefa?
          </AlertDialogDescription>
          <div className="w-full flex sm:flex-row flex-col justify-center gap-4">
            <AlertDialogCancel className="sm:w-[185px] w-full  h-[51px] bg-[#E7EEFB] border-[#E7EEFB]">
              Cancelar
            </AlertDialogCancel>
            <Button
              className="bg-gradient-to-r from-[#D30707] to-[#F05353] sm:w-[185px] w-full h-[51px]"
              onClick={onDelete}
            >
              Deletar
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskCard;
