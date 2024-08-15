// pages/index.tsx
"use client"; 
import React from 'react';
// import 'antd/dist/antd.less';
import { Layout, Typography, Button, Modal } from 'antd';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useState } from 'react';



const { Header, Content } = Layout;
const { Title } = Typography;

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header>
        
      </Header>
      <Content className="p-4">
        <div style={{ display: 'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'10px', paddingRight:'10px' }}>
          <Title className="text-white pt-10">Task Management</Title>
          <Button type="primary" onClick={showModal}>
            Add New Task
          </Button>
        </div>
        <TaskList />
        <Modal
          title="Add New Task"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <TaskForm onClose={handleCancel} />
        </Modal>
      </Content>
      
    </Layout>
  );
};

export default Home;
