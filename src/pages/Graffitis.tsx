import React from 'react';
import Grid from '@mui/material/Grid';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';
import SeagullCard from '../components/cards/graffitis/SeagullCard';
import HooligalCard from '../components/cards/graffitis/HooligalCard';
import ApocapitalismCard from '../components/cards/graffitis/ApocapitalismCard';
import RadioJuly2Card from '../components/cards/graffitis/RadioJuly2Card';
import RadioJulyCard from '../components/cards/graffitis/RadioJulyCard';

export default function Graffitis() {
  return (
    <Grid display="flex">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="mini" backgroundFile="landscapes/concert.jpg" title="Art Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
          <Grid item><HooligalCard /></Grid>
          <Grid item><SeagullCard /></Grid>
          <Grid item><ApocapitalismCard /></Grid>
          <Grid item><RadioJuly2Card /></Grid>
          <Grid item><RadioJulyCard /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
