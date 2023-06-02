import React from 'react';
import Grid from '@mui/material/Grid';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';
import ChemistryTeacherCard from '../components/cards/portraits/ChemistryTeacherCard';
import CousinsCard from '../components/cards/portraits/CousinsCard';
import DancerCard from '../components/cards/portraits/DancerCard';
import DavitruveCard from '../components/cards/portraits/DavitruveCard';
import ElephantsCard from '../components/cards/portraits/ElephantsCard';
import GayLussacCard from '../components/cards/portraits/GayLussacCard';
import GrandmotherCard from '../components/cards/portraits/GrandmotherCard';
import LionCard from '../components/cards/portraits/LionCard';
import NativeCard from '../components/cards/portraits/NativeCard';
import PlasticBirdCard from '../components/cards/portraits/PlasticBirdCard';
import MathsTeacherCard from '../components/cards/portraits/MathsTeacherCard';

export default function PortraitsAndAnimals() {
  return (
    <Grid display="flex">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="mini" backgroundFile="landscapes/concert.jpg" title="Art Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
          <Grid item><ElephantsCard /></Grid>
          <Grid item><DavitruveCard /></Grid>
          <Grid item><DancerCard /></Grid>
          <Grid item><GrandmotherCard /></Grid>
          <Grid item><CousinsCard /></Grid>
          <Grid item><NativeCard /></Grid>
          <Grid item><PlasticBirdCard /></Grid>
          <Grid item><LionCard /></Grid>
          <Grid item><GayLussacCard /></Grid>
          <Grid item><ChemistryTeacherCard /></Grid>
          <Grid item><MathsTeacherCard /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
