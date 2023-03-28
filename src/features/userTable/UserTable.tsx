import { Key, memo, useState } from "react";
import {
  type UserType,
  selectAllUsers,
  deleteUser,
  deleteSelectedUsers,
} from "./userTableSlice";
import { type ColumnsType } from "antd/es/table";
import { Table, Space, Button, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FormattedMessage } from "react-intl";
import styles from "./UserTable.module.scss";
import UserModal from "../../Components/UserModal/UserModal";
import DateOfBirth from "../internationalization/DateOfBirth";

const { Paragraph } = Typography;

const columns: ColumnsType<UserType> = [
  {
    title: <FormattedMessage id="table.name" />,
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: <FormattedMessage id="table.age" />,
    dataIndex: "age",
    key: "age",
    width: 100,
  },
  {
    title: <FormattedMessage id="table.dateOfBirth" />,
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    width: 150,
    render: (date) => {
      return <DateOfBirth date={date} />;
    },
  },
  {
    title: <FormattedMessage id="table.bio" />,
    dataIndex: "bio",
    key: "bio",
    width: 200,
    render: (text) => {
      return (
        <Paragraph
          ellipsis={{
            rows: 1,
            expandable: true,
            symbol: <FormattedMessage id="table.readMore" />,
          }}
        >
          {text}
        </Paragraph>
      );
    },
  },
  {
    title: <FormattedMessage id="table.actions" />,
    key: "action",
    render: (record) => {
      return (
        <Space size="middle">
          <EditButton record={record} />
          <DeleteButton record={record} />
        </Space>
      );
    },
    width: 150,
  },
];

const UserTable = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllUsers);

  const handleDelete = () => {
    messageApi.success(
      <FormattedMessage id="message.deleteSelectedUsers.success" />
    );
    setSelectedRowKeys([]);
    dispatch(deleteSelectedUsers(selectedRowKeys));
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
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          onChange(keys) {
            setSelectedRowKeys(keys);
          },
        }}
        rowKey="key"
        className={styles.table}
        pagination={{
          ...tableParams.pagination,
          total: data.length,
          position: ["topRight", "topLeft"],
          onChange: handleChangePagiantion,
          totalBoundaryShowSizeChanger: 1,
        }}
        scroll={{ y: 500, x: 0 }}
      />
      <Space>
        <UserModal buttonIcon={<PlusOutlined />} />
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
        >
          <FormattedMessage id="button.delete.selected" />
        </Button>
      </Space>
    </div>
  );
};

const EditButton = memo(({ record }: { record: UserType }) => {
  return (
    <Space size="middle">
      <UserModal
        defaultValues={{
          ...record,
          dateOfBirth: new Date(JSON.parse(record.dateOfBirth)),
        }}
        userKey={record.key}
        buttonIcon={<EditOutlined />}
      />
    </Space>
  );
});

const DeleteButton = memo(({ record }: { record: UserType }) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    await messageApi.success({
      content: (
        <FormattedMessage
          id="message.deleteUser.success"
          values={{
            name: record.name,
          }}
        />
      ),
      key: record.key,
      duration: 1,
    });
    dispatch(deleteUser(record.key));
  };

  return (
    <>
      {contextHolder}
      <Space size="middle">
        <Button
          type="default"
          size="small"
          danger
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        >
          <FormattedMessage id="button.delete" />
        </Button>
      </Space>
    </>
  );
});

export default UserTable;
