import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import logoIcon from '../../assets/react.svg';

import {
  MenuOutlined,
  UserAddOutlined,
  DashboardOutlined,
  PlayCircleFilled,
  CodeSandboxOutlined,
  SortAscendingOutlined,
  StrikethroughOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
const [isNavMenuClose, setIsNavMenuClose] = useState(true);

  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const navigate = useNavigate();

  const items = [
    {
      key: 'statistics',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>dashboard</Link>,
    },
    {
      key: 'songs',
      icon: <PlayCircleFilled />,
      label: <Link to={'/songs'}>All Songs</Link>,
    },
    
    {
      key: 'songbyalbum',
      icon: <CodeSandboxOutlined />,
      label: <Link to={'/songbyalbum'}>Song By Album</Link>,
    },
    {
      key: 'songbyartist',
      icon: <SortAscendingOutlined />,
      label: <Link to={'/songbyartist'}>Song By Artist</Link>,
    },
    {
      key: 'songbygenere',
      icon: <StrikethroughOutlined />,
      label: <Link to={'/songbyalbum'}>Song By Genre</Link>,
    },
  ];

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    // navMenu.collapse();
    setIsNavMenuClose(true)
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: '20px',
        top: '20px',
        bottom: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 20px 3px rgba(150, 190, 238, 0.15)',
      }}
      theme={'light'}
    >
      <div className="logo" onClick={() =>
         navigate('/')
         } style={{ cursor: 'pointer' }}>
        <img src={logoIcon} alt="Logo" style={{ height: '32px' }} />

        {!showLogoApp && (
         
          <span 
          style={{ marginTop: '3px', marginLeft: '10px', height: '29px' }}
          >Adis Music</span>
        )}
      </div>
      <Menu items={items} mode="inline" theme={'light'} />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
        rootClassName="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
