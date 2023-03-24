import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Languages } from "../../../features/internationalization/internationalizationSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCurrentLanguage,
  setLanguage,
} from "../../../features/internationalization/internationalizationSlice";

const items: MenuProps["items"] = Object.values(Languages).map((language) => {
  return {
    key: language.locale,
    label: language.name,
  };
});

const LanguageDropdown = () => {
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical">
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => dispatch(setLanguage(key)),
        }}
        trigger={["click", "hover"]}
        placement="bottomRight"
      >
        <Space>
          <Button>
            {currentLanguage.name}
            <DownOutlined />
          </Button>
        </Space>
      </Dropdown>
    </Space>
  );
};

export default LanguageDropdown;
