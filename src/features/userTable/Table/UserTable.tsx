import { Key, useState } from "react";
import { selectAllUsers, deleteSelectedUsers } from "../userTableSlice";
import { Table, Space, Button, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { FormattedMessage } from "react-intl";
import styles from "./UserTable.module.scss";
import UserModal from "../../../Components/UserModal/UserModal";
import columns from "../columns";

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

export default UserTable;
