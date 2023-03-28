import { useState } from "react";
import { Menu, Drawer, MenuTheme, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../../features/internationalization/LanguageDropdown";
import styles from "./Navbar.module.scss";
import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import useIsMobile from "../../../hooks/useIsMobile";
const navigationLinks = [
  {
    path: "/main",
    label: <FormattedMessage id="route.main" />,
  },
  {
    path: "/views",
    label: <FormattedMessage id="route.views" />,
  },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useIsMobile();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Header className={styles.header}>
      {isSmallScreen ? (
        <>
          <MenuOutlined
            className={styles.icon}
            style={{ color: "white" }}
            onClick={toggleDrawer}
          />
          <Drawer
            placement="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            closable={false}
            className={styles.drawer}
          >
            <CloseOutlined
              className={styles.icon}
              style={{ color: "black" }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <Navigation theme="light" onClick={() => setIsDrawerOpen(false)} />
          </Drawer>
        </>
      ) : (
        <Navigation theme="dark" onClick={() => setIsDrawerOpen(false)} />
      )}
    </Header>
  );
};

const Navigation = ({
  theme,
  onClick,
}: {
  theme: MenuTheme;
  onClick: () => void;
}) => (
  <>
    <Menu
      theme={theme}
      mode={theme === "dark" ? "horizontal" : "vertical"}
      className={clsx(styles.menu, {
        [styles.menuDark]: theme === "dark",
      })}
      selectable={false}
    >
      {navigationLinks.map((item) => (
        // using <MenuItem/> instead of <Menu.Item/> to avoid reloading the menu-header on changing the route
        <MenuItem {...item} onClick={onClick} />
      ))}
    </Menu>
    <LanguageDropdown />
  </>
);

const MenuItem = ({
  path,
  label,
  onClick,
}: {
  path: string;
  label: string | React.ReactNode;
  onClick: () => void;
}) => (
  <li onClick={onClick}>
    <Link to={path} className={styles.link}>
      {label}
    </Link>
  </li>
);

export default Navbar;
