import { Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import styles from "./Layout.module.scss";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Navbar />
      <Content className={styles.content}>
        <Space
          style={{
            width: "100%",
          }}
        >
          <Outlet />
        </Space>
      </Content>
    </Layout>
  );
};

export default MainLayout;
