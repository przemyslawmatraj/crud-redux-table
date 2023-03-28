import DateOfBirth from "../../features/internationalization/DateOfBirth";
import { Avatar, Card, Space, Typography, Empty, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Text, Paragraph, Title } = Typography;

interface GenericComponentProps<T> {
  data: T[];
}

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

function GenericComponent<T extends { key: React.Key; name: string }>({
  data,
}: GenericComponentProps<T>) {
  if (data.length === 0)
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
      {data.map((dataItem) => (
        <Card key={dataItem.key}>
          <Space size="large" direction="vertical">
            <Avatar
              size={128}
              src={`https://i.pravatar.cc/150?u=${dataItem.key}`}
            />
            <Meta
              title={<Title level={4}>{dataItem.name}</Title>}
              description={<PersonDescription dataItem={dataItem} />}
            />
          </Space>
        </Card>
      ))}
    </Grid>
  );
}

function PersonDescription<T extends {}>({ dataItem }: { dataItem: T }) {
  return (
    <Space direction="vertical">
      {Object.entries(dataItem).map(([key, value]) => {
        return (
          <Paragraph key={key}>
            <Text strong>
              <FormattedMessage id={`table.${key}`} />:{" "}
            </Text>
            <Text>{String(value)}</Text>
          </Paragraph>
        );
      })}
    </Space>
  );
}

export default GenericComponent;
