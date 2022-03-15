import { Layout, Typography } from "antd";
import { grey } from "@ant-design/colors";

const { Header, Content } = Layout;
const { Title } = Typography;

function MainComponent() {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "80px",
        }}
      >
        <Title level={3} style={{ color: "#fff" }}>
          Session Cert Test Page
        </Title>
      </Header>
      <Content></Content>
    </Layout>
  );
}

export default MainComponent;
