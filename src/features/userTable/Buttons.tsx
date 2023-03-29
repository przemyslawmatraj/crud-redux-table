import { memo } from "react";
import { Space, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { UserType } from "./userTableSlice";
import { useAppDispatch } from "../../app/hooks";
import UserModal from "../../Components/UserModal/UserModal";
import { deleteUser } from "./userTableSlice";

export const EditButton = memo(({ record }: { record: UserType }) => {
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

export const DeleteButton = memo(({ record }: { record: UserType }) => {
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
