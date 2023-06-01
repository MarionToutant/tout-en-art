import React from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import MenuElement from './MenuElement';
import MenuPageElements from '../pages/MenuPageElements';

export default function MenuDrawer() {
  const location = useLocation();

  return (
    <Drawer
      sx={{ width: 240 }}
      PaperProps={{ sx: { width: 240 }}}
      elevation={8}
      variant="permanent"
      anchor="left"
    >
      <List disablePadding>
        <MenuElement
          isHome={true}
          title="Menu"
          navigationPath="/"
          isSelected={location?.pathname === '/'}
          divider
        />
        <MenuPageElements pathName={location?.pathname} />
      </List>
    </Drawer>
  )
}
