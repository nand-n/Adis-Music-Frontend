import { Layout } from 'antd'
import Navigation from './Components/Sidebar'
import useIsMobile from './Hooks/isMobile';
import AppRouter from './Routes/AppRouter';

function App() {

  const { Content } = Layout;
  const isMobile = useIsMobile();


  return (
    <Layout hasSider>
      <Navigation />
      {isMobile ? (
        <Layout style={{ marginLeft: 0 }}>
          <Content
            style={{
              margin: '40px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 'none',
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      ) : (
        <Layout style={{ marginLeft: 220 }}>
          <Content
            style={{
              margin: '40px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 1100,
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      )}
    </Layout>
  )
  
}

export default App