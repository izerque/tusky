
import React, { useState } from 'react';
import { useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../services/api';
import { getTasks} from '../services/taskservices'; 
import { updateTask } from '@/services/api';
import { List, Button, Checkbox, Spin, Card, Modal, Form, Input, message } from 'antd'; 

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const TaskList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading }: UseQueryResult<Task[], Error> = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditTask(task);
  };

  const handleSave = () => {
    if (editTask) {
      updateTask(editTask); 
      setEditTask(null);
      message.success('Task Updated'); 
      queryClient.invalidateQueries(['tasks']); 
    }
  };


  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error fetching tasks</div>;
  }

  return (
    <>
      <List
        style={{  display: 'flex', flexWrap: 'wrap', flexDirection: 'column', width:'100%',  alignContent:'center' }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(task: Task) => (
          <List.Item style={{  display: "flex", width:'100%' ,justifyContent:'center' }}>
            <Card
              style={{ width: '90%', border: '0.5px solid blue' }}
              id='taskcard'
              title={task.title}
              actions={[
                <Button type="link" onClick={() => handleEdit(task)}>Edit</Button>,
                <Button type="link" danger onClick={() => deleteTask(task.id)}>Delete</Button> // Updated to call handleDelete
              ]}
            >
              <Checkbox checked={task.completed}>{task.title}</Checkbox>
              <p>{task.description}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Task"
        visible={editTask !== null}
        onCancel={() => setEditTask(null)}
        footer={[
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form
          initialValues={{ title: editTask?.title, description: editTask?.description }}
          onFinish={(values) => setEditTask({ ...editTask!, title: values.title, description: values.description })}
        >
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
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
