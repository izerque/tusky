import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '../services/taskservices';
import { Form, Input, Button } from 'antd';

type Task = {
  title: string;
  description: string;
  completed: boolean;
};

const TaskForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: Task) => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Fixed TypeScript error
      onClose();
    },
  });

  const onFinish = (values: { title: string; description: string }) => {
    mutation.mutate({
      title: values.title,
      description: values.description,
      completed: false,
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter the task title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Task Description"
        rules={[{ required: true, message: 'Please enter the task description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
