import { ColumnsType } from "antd/lib/table";
import { Space, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import { UserType } from "./userTableSlice";

import DateOfBirth from "../internationalization/DateOfBirth";
import { EditButton, DeleteButton } from "./Buttons";

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

export default columns;
