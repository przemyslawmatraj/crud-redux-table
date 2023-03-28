import { useAppSelector } from "../../app/hooks";
import {
  selectAllUsers,
  UserType,
} from "../../features/userTable/userTableSlice";
import DateOfBirth from "../../features/internationalization/DateOfBirth";
import { Avatar, Card, Space, Typography, Empty, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Text, Paragraph, Title } = Typography;

const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "1rem",
      }}
    >
      {children}
    </section>
  );
};

const GenericComponent = () => {
  const users = useAppSelector(selectAllUsers);

  if (users.length === 0)
    return (
      <Empty>
        <Space direction="vertical" align="center" size="large">
          <Text type="secondary">
            <FormattedMessage id="genericComponent.empty.message" />
          </Text>
          <Button type="primary" size="large">
            <Link to="/">
              <FormattedMessage id="route.main" />
            </Link>
          </Button>
        </Space>
      </Empty>
    );

  return (
    <Grid>
      {users.map((user) => (
        <Card hoverable key={user.key}>
          <Space size="large" direction="vertical">
            <Avatar
              size={128}
              src={`https://i.pravatar.cc/150?u=${user.key}`}
            />
            <Meta
              title={<Title level={4}>{user.name}</Title>}
              description={<PersonDescription user={user} />}
            />
          </Space>
        </Card>
      ))}
    </Grid>
  );
};

const PersonDescription = ({ user }: { user: UserType }) => {
  return (
    <Space direction="vertical">
      <Paragraph>
        <Text strong>
          <FormattedMessage id="table.age" />:{" "}
        </Text>
        <Text>{user.age}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>
          <FormattedMessage id="table.dateOfBirth" />:{" "}
        </Text>
        <Text>
          <DateOfBirth date={user.dateOfBirth} />
        </Text>
      </Paragraph>
      <Paragraph
        ellipsis={{
          rows: 7,
          expandable: true,
          symbol: <FormattedMessage id="table.readMore" />,
        }}
      >
        {user.bio}
      </Paragraph>
    </Space>
  );
};

export default GenericComponent;
