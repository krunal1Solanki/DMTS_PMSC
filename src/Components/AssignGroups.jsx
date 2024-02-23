"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Heading, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Select, Modal } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import axios from 'axios';
import { Table, Space } from 'antd';
import Loader from "./LOader"
import { useDispatch } from 'react-redux';
const { Option } = Select;

const AssignGroups = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [preventiveGroups, setPreventiveGroups] = useState({});
  const [singleSite, setSingleSite] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState(null);
  const [Loaders, setLoaders] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getGroups();
    getUsers();
  }, []);

  const getGroups = async () => {
    setLoaders(true);

    try {
      const apiUrl = '/api/sites/getSiteGroups';
      const response = await fetch(apiUrl, {
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

      });

      if (!response.ok) {
        throw new Error(`Failed to fetch site groups: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      setGroups(responseData.message);
      setLoaders(false);
    } catch (error) {
      console.error('Error fetching site groups:', error.message);
    }
  };



  const getUsers = async () => {
    try {
      const apiUrl = '/api/user/getUserWithGroups';
      const response = await fetch(apiUrl, {
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      setUsers(responseData.message);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };



  const handleAssignSite = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setSelectedGroups({});
  };

  const assignSingle = async (record, preventive) => {

    try {
      const currGroups = singleSite[record._id] || [];
      const data = currGroups.map((groupId) => ({
        groupId,
        groupName: groups.find((item) => item._id === groupId)?.groupName || '',
      }));

      const payload = {
        userId: record._id,
        groups: data,
      };

      const info = await fetch('/api/sites/assignGroup', {
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

        body: JSON.stringify(payload),
      });

      if (!info.ok) {
        throw new Error(`Failed to assign group: ${info.status} - ${info.statusText}`);
      }

      const responseData = await info.json();
      // Use responseData as needed

      if (responseData.message == 'Some Groups Are Already Assigned')
        toast({
          title: 'Whoops!',
          position: 'top-right',
          description: 'Some groups are already assigned to the user!',
          status: 'warning',
          duration: '3000',
        });
      else
        toast({
          title: 'Success!',
          position: 'top-right',
          description: 'Groups have been assigned successfully',
          status: 'success',
          duration: '3000',
        });

      setSelectedGroups((prevSelectedGroups) => {
        const updatedSelectedGroups = { ...prevSelectedGroups };
        updatedSelectedGroups[record._id] = [];
        return updatedSelectedGroups;
      });

      console.log('INFOO', info);
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: `${error.message}`,
        position: 'top-right',
        status: 'danger',
        position: 'top-right',
        duration: '3000',
      });
      console.log('ERROR', error.message);
    }
    getUsers();
  };

  const assignGroup = async (record, preventive) => {

    try {
      const currGroups = selectedGroups[record._id] || [];
      const data = currGroups.map((groupId) => ({
        groupId,
        groupName: groups.find((item) => item._id === groupId)?.groupName || '',
      }));

      const payload = {
        userId: record._id,
        groups: data,
      };

      const info = await fetch('/api/sites/assignGroup', {
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

        body: JSON.stringify(payload),
      });

      if (!info.ok) {
        throw new Error(`Failed to assign group: ${info.status} - ${info.statusText}`);
      }

      const responseData = await info.json();
      // Use responseData as needed

      if (responseData.message == 'Some Groups Are Already Assigned')
        toast({
          title: 'Whoops!',
          position: 'top-right',
          description: 'Some groups are already assigned to the user!',
          status: 'warning',
          duration: '3000',
        });
      else
        toast({
          title: 'Success!',
          position: 'top-right',
          description: 'Groups have been assigned successfully',
          status: 'success',
          duration: '3000',
        });

      setSelectedGroups((prevSelectedGroups) => {
        const updatedSelectedGroups = { ...prevSelectedGroups };
        updatedSelectedGroups[record._id] = [];
        return updatedSelectedGroups;
      });

      console.log('INFOO', info);
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: `${error.message}`,
        position: 'top-right',
        status: 'danger',
        position: 'top-right',
        duration: '3000',
      });
      console.log('ERROR', error.message);
    }
    getUsers();
  };

  const assignPreventive = async (record, preventive) => {

    try {
      const currGroups = preventiveGroups[record._id] || [];
      const data = currGroups.map((groupId) => ({
        groupId,
        groupName: groups.find((item) => item._id === groupId)?.groupName || '',
        isPreventive: true
      }));

      const payload = {
        userId: record._id,
        groups: data,
      };

      const info = await fetch('/api/sites/assignGroup', {
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

        body: JSON.stringify(payload),
      });

      if (!info.ok) {
        throw new Error(`Failed to assign group: ${info.status} - ${info.statusText}`);
      }

      const responseData = await info.json();
      // Use responseData as needed

      if (responseData.message == 'Some Groups Are Already Assigned')
        toast({
          title: 'Whoops!',
          position: 'top-right',
          description: 'Some groups are already assigned to the user!',
          status: 'warning',
          duration: '3000',
        });
      else
        toast({
          title: 'Success!',
          position: 'top-right',
          description: 'Groups have been assigned successfully',
          status: 'success',
          duration: '3000',
        });

      setSelectedGroups((prevSelectedGroups) => {
        const updatedSelectedGroups = { ...prevSelectedGroups };
        updatedSelectedGroups[record._id] = [];
        return updatedSelectedGroups;
      });

      console.log('INFOO', info);
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: `${error.message}`,
        position: 'top-right',
        status: 'danger',
        position: 'top-right',
        duration: '3000',
      });
      console.log('ERROR', error.message);
    }
    getUsers();
  };

  const deleteGroup = async (userId, groupId) => {
    try {
      const apiUrl = '/api/sites/unassignGroup';
      const info = await fetch(apiUrl, {
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

        body: JSON.stringify({ userId, groupId }),
      });

      if (!info.ok) {
        throw new Error(`Failed to unassign group: ${info.status} - ${info.statusText}`);
      }

      toast({
        title: 'Success!',
        description: 'Group has been deleted successfully',
        position: 'top-right',
        status: 'success',
        duration: '3000',
      });

      getUsers();
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: `${error.message}`,
        position: 'top-right',
        status: 'danger',
        duration: '3000',
      });

      console.log('ERROR', error.message);
    }
  };

  const showDeleteConfirmation = (userId, groupId) => {
    setDeletingGroup({ userId, groupId });
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteConfirmation = async () => {
    if (deletingGroup) {
      const { userId, groupId } = deletingGroup;
      await deleteGroup(userId, groupId);
      setDeletingGroup(null);
      setDeleteConfirmationVisible(false);
    }
  };

  const handleCancelDeleteConfirmation = () => {
    setDeletingGroup(null);
    setDeleteConfirmationVisible(false);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'Operator Name',
      dataIndex: 'OperatorName',
      key: 'OperatorName',
    },
    {
      title: 'Assigned Groups',
      dataIndex: 'assignedGroups',
      key: 'assignedGroups',
      render: (text, record) => (
        <>
          {record.assignedGroups.map((group) => (
            <span key={group._id} style={{ marginRight: '8px' }}>
              <Button
                size="sm"
                variant="solid"
                colorScheme={!group.isPreventive ? "teal" : "blue"}
                onClick={() => showDeleteConfirmation(record._id, group.groupId)}
              >
                {`${group.groupName}${group.isPreventive ? "(P)" : ""}`}
                <DeleteFilled />
              </Button>
            </span>
          ))}
        </>
      ),
    },
    {
      title: 'Assign Groups',
      key: 'assignGroup',
      render: (text, record) => (
        <Space size="middle">
          <Select
            mode="multiple"
            style={{ width: '150px' }}
            placeholder="Select groups"
            value={selectedGroups[record._id]}
            onChange={(selectedValues) => setSelectedGroups({ ...selectedGroups, [record._id]: selectedValues })}
          >
            {groups.filter((item) => item.sites.length != 1).map((group) => (
              <Option key={group._id} value={group._id}>
                {group.groupName}
              </Option>
            ))}
          </Select>

          <Button onClick={() => assignGroup(record)}>Go</Button>
        </Space>
      ),
    },
    {
      title: 'Assign Preventive',
      key: 'assignGroup',
      render: (text, record) => (
        <Space size="middle">
          <Select
            mode="multiple"
            style={{ width: '150px' }}
            placeholder="Select groups"
            value={preventiveGroups[record._id]}
            onChange={(selectedValues) => setPreventiveGroups({ ...selectedGroups, [record._id]: selectedValues })}
          >
            {groups.filter((item) => item.sites.length != 1).map((group) => (
              <Option key={group._id} value={group._id}>
                {group.groupName}
              </Option>
            ))}
          </Select>

          <Button onClick={() => assignPreventive(record, true)}>Go</Button>
        </Space>
      ),
    },
    {
      title: 'Assign Single Site',
      key: 'assignGroup',
      render: (text, record) => (
        <Space size="middle">
          <Select
            mode="multiple"
            style={{ width: '150px' }}
            placeholder="Select groups"
            value={singleSite[record._id]}
            onChange={(selectedValues) => setSingleSite({ ...selectedGroups, [record._id]: selectedValues })}
          >
            {groups.filter((item) => item.sites.length == 1).map((group) => (
              <Option key={group._id} value={group._id}>
                {console.log("GROUPD", group)}
                {group.groupName}
              </Option>
            ))}
          </Select>

          <Button onClick={() => assignSingle(record)}>Go</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Confirm Deletion"
        visible={deleteConfirmationVisible}
        onOk={handleDeleteConfirmation}
        onCancel={handleCancelDeleteConfirmation}
        okText="Yes"
        cancelText="No"
      >
        Are you sure you want to delete this group?
      </Modal>

      <Card>
        <CardHeader bg="teal.500" borderBottomWidth="1px" borderColor="teal.600" color="white" textAlign="center" padding="4">
          <Heading size="md" textTransform="uppercase">
            Assign Groups
          </Heading>
        </CardHeader>
        <CardBody>
          <Table
            dataSource={users}
            columns={columns}
            pagination={{
              pageSize: 10,
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default AssignGroups;
