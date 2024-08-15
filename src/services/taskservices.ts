// src/services/taskService.ts
import axios from 'axios';

type Task = {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
};

export const getTasks = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
  return response.data;
};

export const addTask = async (newTask: Task) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
  return response.data;
};
