import { Key, useRef, useState } from "react";
import {
  type UserType,
  allUsers,
  editUser,
  deleteUser,
  deleteSelectedUsers,
} from "./userTableSlice";
import { type ColumnsType } from "antd/es/table";
import { Table, Space, Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./UserTable.module.scss";

const columns: ColumnsType<UserType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 100,
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    width: 150,
  },
  {
    title: "Bio",
    dataIndex: "bio",
    key: "bio",
    width: 400,
  },
  {
    title: "Action",
    key: "action",
    render: (record) => {
      return (
        <Space size="middle">
          <EditOutlined record={record} />
          <DeleteOutlined record={record} />
        </Space>
      );
    },
    width: 150,
  },
];

const Main = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
    },
  });
  const selectedRowKeys = useRef<Key[]>([]);

  const dispatch = useAppDispatch();

  const data = useAppSelector(allUsers);

  const handleDelete = () => {
    dispatch(deleteSelectedUsers(selectedRowKeys.current));
  };

  const handleChangePagiantion = (page: number, pageSize: number) => {
    setTableParams((prev) => ({
      pagination: {
        current: page,
        pageSize,
        pageSizeOptions: prev.pagination.pageSizeOptions,
      },
    }));
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          onChange(selectedRowKeyss, selectedRows, info) {
            selectedRowKeys.current = selectedRowKeyss;
          },
        }}
        className={styles.table}
        pagination={{
          ...tableParams.pagination,
          total: data.length,
          position: ["topRight", "topLeft"],
          onChange: handleChangePagiantion,
        }}
        scroll={{ y: 500, x: 0 }}
      />
      <Button type="primary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

const EditOutlined = ({ record }: { record: UserType }) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    const newRecord = {
      ...record,
      name: "new name",
      age: 100,
      dateOfBirth: "01/01/2000",
      bio: "new bio",
    };
    dispatch(editUser(newRecord));
  };

  return (
    <Space size="middle">
      <Button type="primary" onClick={handleEdit}>
        Edit
      </Button>
    </Space>
  );
};

const DeleteOutlined = ({ record }: { record: UserType }) => {
  const dispatch = useAppDispatch();
  return (
    <Space size="middle">
      <Button
        type="primary"
        onClick={() => {
          dispatch(deleteUser(record.key));
        }}
      >
        Delete
      </Button>
    </Space>
  );
};

export default Main;
