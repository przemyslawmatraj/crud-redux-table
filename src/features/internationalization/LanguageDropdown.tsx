import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Languages } from "./internationalizationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCurrentLanguage,
  setLanguage,
} from "./internationalizationSlice";

const items: MenuProps["items"] = Object.values(Languages).map((language) => {
  return {
    key: language.locale,
    label: language.name,
  };
});

const LanguageDropdown = () => {
  const { name } = useAppSelector(selectCurrentLanguage);
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical">
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => dispatch(setLanguage(key)),
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Space>
          <Button>
            {name}
            <DownOutlined />
          </Button>
        </Space>
      </Dropdown>
    </Space>
  );
};

export default LanguageDropdown;
