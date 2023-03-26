import { Typography, Space } from "antd";
import UserTable from "../features/userTable/UserTable";
import { FormattedMessage } from "react-intl";

const { Title } = Typography;

const Main = () => {
  return (
    <Space direction="vertical">
      <Title>
        <FormattedMessage id="route.main" />
      </Title>
      <UserTable />
    </Space>
  );
};

export default Main;
