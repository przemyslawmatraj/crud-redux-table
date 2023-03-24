import { Layout, Menu, theme } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdown";
import Navbar from "./Navbar/Navbar";
import styles from "./Layout.module.scss";

const { Content } = Layout;

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

export default MainLayout;
