import React from 'react';
import Grid from '@mui/material/Grid';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';

export default function Graffitis() {
  return (
    <Grid display="flex">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="mini" backgroundFile="portraits-music-band.jpg" title="Art.Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
        </Grid>
      </Grid>
    </Grid>
  );
}