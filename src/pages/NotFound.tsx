import { Space, Typography, Image, Button } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import img from "../assets/404.svg";

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <Space direction="vertical" align="center" size="large">
      <Image src={img} width={200} preview={false} />
      <Title
        style={{
          textAlign: "center",
        }}
      >
        <FormattedMessage id="route.notFound" />
      </Title>
      <Text type="secondary">
        <FormattedMessage id="route.notFound.message" />
      </Text>
      <Button type="primary">
        <Link to="/">
          <FormattedMessage id="route.main" />
        </Link>
      </Button>
    </Space>
  );
};

export default NotFound;
