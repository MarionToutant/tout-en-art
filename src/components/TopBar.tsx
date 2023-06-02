import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

type VersionType = "full" | "mini";

interface ITopBarProps {
  readonly version: VersionType;
  readonly backgroundFile: string;
  readonly title: string;
  readonly subtitle?: string;
};

const appBarHeight = (version: VersionType) => version === "full" ? "550px" : "150px";

const appBar = ({ version, backgroundFile, title, subtitle }: ITopBarProps) => {
  const requireBackgroundFile = require(`../media/${backgroundFile}`);

  return (
    <AppBar sx={{ width: "calc(100% - 240px)", height: appBarHeight(version) }}>
      <Box
        sx={{
          backgroundImage: `url(${requireBackgroundFile})`,
          backgroundSize: "cover",
          height: appBarHeight(version),
        }}
        display="flex"
        flexDirection="column"
        padding="20px"
      >
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
      </Box>
    </AppBar>
  )
};

export default function TopBar({ version, backgroundFile, title, subtitle }: ITopBarProps) {
  const trigger = !useScrollTrigger();

  if (version === "full") return (
    <>
      <Slide appear={false} direction="down" in={trigger}>
        {appBar({ version, backgroundFile, title, subtitle })}
      </Slide>
      <Toolbar sx={{ height: appBarHeight(version) }} />
    </>
  )

  return (
    <>
      {appBar({ version, backgroundFile, title, subtitle })}
      <Toolbar sx={{ height: appBarHeight(version) }} />
    </>
  )
}
