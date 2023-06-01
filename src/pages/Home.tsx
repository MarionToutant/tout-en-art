import React from 'react';
import Grid from '@mui/material/Grid';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Grid display="flex" overflow="hidden">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="full" backgroundFile="portraits-music-band.jpg" title="Art.Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
          <Grid item paddingRight="50px" xs={12}>
            <Typography variant="h6" color="text.secondary" fontStyle="italic">
              Ce site donne un aperçu de mes créations artistiques : peintures acryliques, peintures à l’huile, au couteau, pastels, aquarelles, croquis, graffitis…
              <br /> La section « Jeunesse » regroupe des créations plus anciennes, réalisées entre 9 et 16 ans &#x1F603;
              <br /> Bonne visite !
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
