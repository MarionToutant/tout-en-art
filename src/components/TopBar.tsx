import React from 'react';
import { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export type VersionType = "full" | "mini";

interface ITopBarProps {
  readonly version: VersionType;
  readonly height: number;
  readonly isDrawerOpen: boolean;
  readonly sx: SxProps;
  readonly handleDrawerOpen: () => void;
  readonly handleDrawerClose: () => void;
  readonly backgroundFile: string;
  readonly title: string;
  readonly subtitle?: string;
};

interface ISliderProps {
  readonly children: React.ReactElement;
  readonly version: VersionType;
  readonly trigger: boolean;
}

function Slider({ children, version, trigger }: ISliderProps) {
  if (version === "full") return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  )

  return (<>{children}</>)
}

export default function TopBar({
  version,
  height,
  isDrawerOpen,
  sx,
  handleDrawerOpen,
  handleDrawerClose,
  backgroundFile,
  title,
  subtitle,
}: ITopBarProps) {
  const trigger = !useScrollTrigger();
  
  return (
    <Slider version={version} trigger={trigger}>
      <AppBar sx={sx}>
        <Toolbar
          sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "10px 20px",
              backgroundImage: `url(${require(`../media/${backgroundFile}`)})`,
              backgroundSize: "cover",
              height,
            }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={isDrawerOpen ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Box 
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "420px",
              padding: "15px"
            }}
          >
            <Typography variant="h3" textTransform="uppercase" fontWeight="bold" sx={{ opacity: 1 }}>
              {title}
            </Typography>
            {subtitle ? <Typography variant="h5">{subtitle}</Typography> : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Slider>
  )
}
