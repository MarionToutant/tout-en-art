import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MasterPage from '../components/MasterPage';
import JocondeCard from '../components/cards/youth/JocondeCard';
import LeBlancCard from '../components/cards/youth/LeBlancCard';
import BedroomGraffitiCard from '../components/cards/youth/BedroomGraffitiCard';
import ShedCard from '../components/cards/youth/ShedCard';
import LaPalmyreCard from '../components/cards/youth/LaPalmyreCard';
import BowtiesCard from '../components/cards/youth/BowtiesCard';

export default function Youth() {
  return (
    <MasterPage topBarVersion="mini">
      <Grid item paddingRight="50px" xs={12}>
        <Typography variant="h6" color="text.secondary" fontStyle="italic">
          Cette section regroupe des créations plus anciennes, réalisées entre 9 et 16 ans &#x1F603;
        </Typography>
      </Grid>
      <Grid item><JocondeCard /></Grid>
      <Grid item><LeBlancCard /></Grid>
      <Grid item><ShedCard /></Grid>
      <Grid item><LaPalmyreCard /></Grid>
      <Grid item><BedroomGraffitiCard /></Grid>
      <Grid item><BowtiesCard /></Grid>
    </MasterPage>
  );
}
