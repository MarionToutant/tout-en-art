import React from 'react';
import Grid from '@mui/material/Grid';
import MasterPage from '../components/MasterPage';
import SeagullCard from '../components/cards/graffitis/SeagullCard';
import HooligalCard from '../components/cards/graffitis/HooligalCard';
import ApocapitalismCard from '../components/cards/graffitis/ApocapitalismCard';
import RadioJuly2Card from '../components/cards/graffitis/RadioJuly2Card';
import RadioJulyCard from '../components/cards/graffitis/RadioJulyCard';

export default function Graffitis() {
  return (
    <MasterPage topBarVersion="mini">
      <Grid item><HooligalCard /></Grid>
      <Grid item><SeagullCard /></Grid>
      <Grid item><ApocapitalismCard /></Grid>
      <Grid item><RadioJuly2Card /></Grid>
      <Grid item><RadioJulyCard /></Grid>
    </MasterPage>
  );
}
