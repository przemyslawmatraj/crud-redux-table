import { Key, memo, useRef, useState } from "react";
import {
  type UserType,
  selectAllUsers,
  deleteUser,
  deleteSelectedUsers,
} from "./userTableSlice";
import { type ColumnsType } from "antd/es/table";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FormattedMessage } from "react-intl";
import styles from "./UserTable.module.scss";
import UserModal from "../../Components/UserModal/UserModal";
import { selectCurrentLanguage } from "../internationalization/internationalizationSlice";

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
    width: 150,
    render: (text) => {
      return <p className={styles.bio}>{text}</p>;
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

  const dispatch = useAppDispatch();

  const data = useAppSelector(selectAllUsers);

  const handleDelete = () => {
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
        defaultValues={record}
        userKey={record.key}
        buttonIcon={<EditOutlined />}
      />
    </Space>
  );
});

const DeleteButton = memo(({ record }: { record: UserType }) => {
  const dispatch = useAppDispatch();
  return (
    <Space size="middle">
      <Button
        type="default"
        size="small"
        danger
        onClick={() => {
          dispatch(deleteUser(record.key));
        }}
        icon={<DeleteOutlined />}
      >
        <FormattedMessage id="button.delete" />
      </Button>
    </Space>
  );
});

const DateOfBirth = ({ date }: { date: Date }) => {
  const language = useAppSelector(selectCurrentLanguage);
  const formattedLocale =
    language.locale.slice(0, 2) + "-" + language.locale.slice(2);

  return (
    <>
      {new Intl.DateTimeFormat(formattedLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)}
    </>
  );
};

export default UserTable;
