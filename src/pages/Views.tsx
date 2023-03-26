import { Typography, Space } from "antd";
import UserTable from "../features/userTable/UserTable";
import { FormattedMessage } from "react-intl";

const { Title } = Typography;

const Views = () => {
  return (
    <Space direction="vertical">
      <Title>
        <FormattedMessage id="route.views" />
      </Title>
      <UserTable />
    </Space>
  );
};

export default Views;
