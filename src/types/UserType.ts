import { TaskType } from './TaskType';

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  tasks: TaskType[];
}
