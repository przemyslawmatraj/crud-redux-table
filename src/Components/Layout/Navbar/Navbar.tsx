import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useRoutes } from "react-router-dom";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Navbar.module.scss";

const navigationLinks = [
  {
    path: "/main",
    label: "Main",
  },
  {
    path: "/views",
    label: "Views",
  },
];

const Navbar = () => {
  return (
    <Header className={styles.header}>
      <Menu
        theme="dark"
        mode="horizontal"
        className={styles.menu}
        selectable={false}
      >
        {navigationLinks.map((item) => (
          // using <MenuItem/> instead of <Menu.Item/> to avoid reloading the menu-header on changing the route
          <MenuItem key={item.path} {...item} />
        ))}
      </Menu>
      <LanguageDropdown />
    </Header>
  );
};

const MenuItem = ({
  path,
  label,
}: {
  path: string;
  label: string | React.ReactNode;
}) => (
  <li>
    <Link to={path} className={styles.link}>
      {label}
    </Link>
  </li>
);

export default Navbar;
