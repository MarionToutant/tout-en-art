import React from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import MenuElement from './MenuElement';
import MenuPageElements from '../pages/MenuPageElements';

export const drawerWidth = 240;

interface IMenuDrawerProps {
  readonly isOpen: boolean;
}

export default function MenuDrawer({ isOpen }: IMenuDrawerProps) {
  const location = useLocation();

  return (
    <Drawer
      sx={{ width: drawerWidth }}
      PaperProps={{ sx: { width: drawerWidth }}}
      elevation={8}
      variant="persistent"
      anchor="left"
      open={isOpen}
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
