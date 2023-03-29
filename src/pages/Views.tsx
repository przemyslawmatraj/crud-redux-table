import { useState } from "react";
import { Typography, Space } from "antd";
import GenericComponent from "../Components/common/GenericComponent/GenericComponent";
import { FormattedMessage } from "react-intl";
import { useAppSelector } from "../app/hooks";
import { selectAllUsers, UserType } from "../features/userTable/userTableSlice";

const { Title } = Typography;

const Views = () => {
  const users = useAppSelector(selectAllUsers);
  return (
    <>
      <Title
        style={{
          textAlign: "center",
        }}
      >
        <FormattedMessage id="route.views" />
      </Title>
      <GenericComponent<UserType> data={users} />
    </>
  );
};

export default Views;
