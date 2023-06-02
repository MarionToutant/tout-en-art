import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuDrawer from '../components/MenuDrawer';
import TopBar from '../components/TopBar';
import SeagullCard from '../components/cards/graffitis/SeagullCard';
import HooligalCard from '../components/cards/graffitis/HooligalCard';
import ApocapitalismCard from '../components/cards/graffitis/ApocapitalismCard';
import RadioJuly2Card from '../components/cards/graffitis/RadioJuly2Card';
import RadioJulyCard from '../components/cards/graffitis/RadioJulyCard';
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
import JocondeCard from '../components/cards/youth/JocondeCard';
import LeBlancCard from '../components/cards/youth/LeBlancCard';
import BedroomGraffitiCard from '../components/cards/youth/BedroomGraffitiCard';
import ShedCard from '../components/cards/youth/ShedCard';
import LaPalmyreCard from '../components/cards/youth/LaPalmyreCard';
import BowtiesCard from '../components/cards/youth/BowtiesCard';

export default function Home() {
  return (
    <Grid display="flex" overflow="hidden">
      <MenuDrawer />
      <Grid display="flex" flexDirection="column">
        <TopBar version="full" backgroundFile="landscapes/concert.jpg" title="Art Tout-en-M" subtitle="Site personnel de créations artistiques" />
        <Grid container margin="0px 0px 40px 0px" display="flex" spacing={4}>
          <Grid item paddingRight="50px" xs={12}>
            <Typography variant="h6" color="text.secondary" fontStyle="italic">
              Ce site donne un aperçu de mes créations artistiques : peintures acryliques, peintures à l’huile, au couteau, pastels, aquarelles, croquis, graffitis…
              <br /> Bonne visite &#x1F603; !
            </Typography>
          </Grid>
          <Grid item><HooligalCard /></Grid>
          <Grid item><SeagullCard /></Grid>
          <Grid item><ApocapitalismCard /></Grid>
          <Grid item><RadioJuly2Card /></Grid>
          <Grid item><RadioJulyCard /></Grid>
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
          <Grid item><JocondeCard /></Grid>
          <Grid item><LeBlancCard /></Grid>
          <Grid item><ShedCard /></Grid>
          <Grid item><LaPalmyreCard /></Grid>
          <Grid item><BedroomGraffitiCard /></Grid>
          <Grid item><BowtiesCard /></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
