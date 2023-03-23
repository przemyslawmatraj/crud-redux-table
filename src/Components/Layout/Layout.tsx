import { Layout, Menu, theme } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
import { useEffect } from "react";
import styles from "./Layout.module.scss";

const { Header, Content } = Layout;

const items = [
  {
    path: "/",
    label: <HomeFilled />,
  },
  {
    path: "/main",
    label: "Main",
  },
  {
    path: "/views",
    label: "Views",
  },
];

const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Navbar />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

const Navbar = () => {
  return (
    <Header
      style={{
        height: "auto",
      }}
    >
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        {items.map((item) => (
          <ListElement key={item.path} {...item} />
        ))}
      </Menu>
    </Header>
  );
};

const ListElement = ({
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

export default MainLayout;
