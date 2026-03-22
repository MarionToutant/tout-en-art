import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TopBar from './TopBar';
import CardItem from './CardItem';
import { sections } from '../data/cards';
import concertImg from '../media/landscapes/concert.jpg';

export default function Home() {
  return (
    <Box>
      <TopBar
        height={{ xs: 220, sm: 360, md: 550 }}
        backgroundFile={concertImg}
        title="Tout-en-M"
        subtitle="Créations artistiques"
      />
      <Grid container display="flex" gap={6} sx={{ padding: { xs: '18px 12px', sm: '32px 24px' } }}>
        {sections.map((section) => (
          <Grid key={section.title} item xs={12} container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h5" textTransform="uppercase" fontWeight={300} color="text.secondary">
                {section.title}
              </Typography>
            </Grid>
            {section.cards.map((card) => (
              <Grid item key={card.title ?? card.mediaFile} xs={12} sm={6} md={4} lg={3}>
                <CardItem {...card} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
