import React from 'react';
import Grid from '@mui/material/Grid';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';
import EnvulminuresCard from '../components/cards/landscapes/EnvulminuresCard';
import ConcertCard from '../components/cards/landscapes/ConcertCard';
import ImaginaryWorldCard from '../components/cards/landscapes/ImaginaryWorldCard';
import ParisCard from '../components/cards/landscapes/ParisCard';
import MontrealCard from '../components/cards/landscapes/MontrealCard';
import ElephantsAndTreeCard from '../components/cards/landscapes/ElephantsAndTreeCard';
import LimogesCard from '../components/cards/landscapes/LimogesCard';
import NafelsCard from '../components/cards/landscapes/NafelsCard';
import SnowCard from '../components/cards/landscapes/SnowCard';
import PinkCityCard from '../components/cards/landscapes/PinkCityCard';
import EguzonCard from '../components/cards/landscapes/EguzonCard';
import DistopyCard from '../components/cards/landscapes/DistopyCard';
import PillCard from '../components/cards/landscapes/PillCard';

export default function LandscapesAndObjects() {
  return (
    <Grid display="flex">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="mini" backgroundFile="landscapes/concert.jpg" title="Art Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
          <Grid item><EnvulminuresCard /></Grid>
          <Grid item><ConcertCard /></Grid>
          <Grid item><ImaginaryWorldCard /></Grid>
          <Grid item><ParisCard /></Grid>
          <Grid item><PillCard /></Grid>
          <Grid item><MontrealCard /></Grid>
          <Grid item><LimogesCard /></Grid>
          <Grid item><NafelsCard /></Grid>
          <Grid item><SnowCard /></Grid>
          <Grid item><ElephantsAndTreeCard /></Grid>
          <Grid item><PinkCityCard /></Grid>
          <Grid item><EguzonCard /></Grid>
          <Grid item><DistopyCard /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
