import React, { useRef } from 'react';
import {
  Drawer,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import Content from './components/Content';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '../scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface Route {
  layout: string;
  path: string;
  name: string;
  icon: React.ReactNode;
  children?: Route[];
}

function Sidebar() {
  // Define your sidebar related variables
  // ...
  const routes: Route[] = [
    {
      layout: '/admin',
      path: '/softwares',
      name: 'softwares',
      icon: <DashboardIcon />,
    },
  ];
  return (
    <Box
      display={{ sm: 'none', xl: 'block' }}
      position='fixed'
      minHeight='100vh'
    >
      <Box
        sx={{
          background: '#ffffff', // Set your background color here
          transition: '0.2s linear', // Adjust as needed
          width: '300px',
          height: '100vh',
          margin: '0px', // Adjust as needed
          minHeight: '100%',
          overflowX: 'hidden',
          boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.08)', // Adjust as needed
        }}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export function SidebarResponsive() {
  const isOpen = false; // Initialize isOpen as needed
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const routes: Route[] = [
    {
      layout: '/admin',
      path: '/softwares',
      name: 'softwares',
      icon: <DashboardIcon />,
    },
  ];

  return (
    <Box display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
      <Tooltip title='Open Menu'>
        <IconButton
          ref={btnRef}
          color='inherit'
          onClick={() => {
            // handle opening the drawer
          }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        open={isOpen}
        onClose={() => {
          // handle closing the drawer
        }}
        // Adjust placement as needed
      >
        {/* Modify as needed */}
        <Box
          width='285px'
          maxWidth='285px'
          bgcolor='#ffffff' // Set your background color here
        >
          {/* ... */}
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
