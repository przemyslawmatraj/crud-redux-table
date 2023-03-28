import { Typography, Space } from "antd";
import GenericComponent from "../Components/GenericComponent/GenericComponent";
import { FormattedMessage } from "react-intl";

const { Title } = Typography;

const Views = () => {
  return (
    <Space direction="vertical">
      <Title
        style={{
          textAlign: "center",
        }}
      >
        <FormattedMessage id="route.views" />
      </Title>
      <GenericComponent />
    </Space>
  );
};

export default Views;
