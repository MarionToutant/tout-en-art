import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuDrawer, { drawerWidth } from './MenuDrawer';
import TopBar, { VersionType } from './TopBar';

interface IMasterPageProps {
  readonly children: React.ReactNode;
  readonly topBarVersion: VersionType;
}

type ElementType = "topBar" | "container";

export default function MasterPage({ children, topBarVersion }: IMasterPageProps) {
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const topBarHeight = topBarVersion === "full" ? 550 : 200;

  const pageSx = (element: ElementType) => isDrawerOpen ? {
    transition: theme.transitions.create(["margin", element === "topBar" ? "width" : ""], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  } : {
    transition: theme.transitions.create(["margin", element === "topBar" ? "width" : ""], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };

  const topBarSx = isDrawerOpen ? { width: `calc(100% - ${drawerWidth}px)` } : null;

  const containerSx = isDrawerOpen ? {
    margin: `${topBarHeight + 15}px 0px 40px 20px`,
  } : {
    flexGrow: 1,
    margin: `${topBarHeight + 15}px 0px 40px ${-drawerWidth + 15}px`,
  };

  return (
    <Grid display="flex" overflow="hidden">
      <MenuDrawer isOpen={isDrawerOpen} />
      <Grid display="flex" flexDirection="column" sx={{ ...containerSx, ...pageSx("container") }}>
        <TopBar
          version={topBarVersion}
          height={topBarHeight}
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          backgroundFile="landscapes/concert.jpg"
          title="Art Tout-en-M"
          subtitle="Site personnel de créations artistiques"
          sx={{ ...topBarSx, ...pageSx("topBar"), height: topBarHeight }}
        />
        <Grid container display="flex" spacing={4}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
