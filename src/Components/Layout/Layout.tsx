import { Layout } from "antd";
import { Outlet } from "react-router-dom";
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
