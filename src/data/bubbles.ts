import hooligalImg from '../media/hooligal.jpg';
import radioJulyImg from '../media/radio-july.jpg';
import seagullImg from '../media/seagull.jpg';
import concertImg from '../media/concert.jpg';
import envulminuresImg from '../media/envulminures.jpg';
import imaginaryWorldImg from '../media/imaginary-world.jpg';
import limogesImg from '../media/limoges.jpg';
import montrealImg from '../media/montreal.jpg';
import nafelsImg from '../media/nafels.jpg';
import parisImg from '../media/paris.jpg';
import snowImg from '../media/snow.jpg';
import dancerImg from '../media/dancer.jpg';
import elephantsImg from '../media/elephants.jpg';
import grandmotherImg from '../media/grandmother.jpg';
import type { Section } from '../types/bubble';

export const sections: Section[] = [
  {
    title: 'Graffitis',
    bubbles: [
      { mediaFile: hooligalImg, title: 'Hooligal', subtitle: 'Bombes de peinture', description: '2022' },
      { mediaFile: seagullImg, title: 'Mouette et paquet de chips', subtitle: 'Bombes de peinture', description: '2022' },
      { mediaFile: radioJulyImg, title: 'Radio July', subtitle: 'Bombes de peinture', description: '2023' },
    ],
  },
  {
    title: 'Paysages & Objets',
    coverMediaFile: imaginaryWorldImg,
    bubbles: [
      { mediaFile: envulminuresImg, title: 'Envulminures', subtitle: 'Feutre sur papier', description: '2023' },
      { mediaFile: concertImg, title: 'Concert', subtitle: 'Acrylique sur toile', description: '2009' },
      { mediaFile: imaginaryWorldImg, title: 'Paysage fantastique', subtitle: 'Acrylique sur toile', description: '2013' },
      { mediaFile: parisImg, title: 'Vue de Paris', subtitle: 'Acrylique sur trois toiles', description: '2020' },
      { mediaFile: montrealImg, title: 'Escaliers de Montréal', subtitle: 'Acrylique sur toile', description: '2012' },
      { mediaFile: limogesImg, title: 'Limoges, rue de la Boucherie', subtitle: 'Acrylique sur deux toiles', description: '2014' },
      { mediaFile: nafelsImg, title: 'Montagne à Nafels', subtitle: 'Acrylique sur toile', description: '2011' },
      { mediaFile: snowImg, title: 'Neige au Québec', subtitle: 'Acrylique sur toile', description: '2011' },
    ],
  },
  {
    title: 'Portraits & Animaux',
    coverMediaFile: elephantsImg,
    bubbles: [
      { mediaFile: elephantsImg, title: 'Eléphants', subtitle: "Peinture à l'huile au couteau sur papier Canson", description: '2013' },
      { mediaFile: dancerImg, title: 'Danseuse', subtitle: 'Acrylique sur papier Canson', description: '2012' },
      { mediaFile: grandmotherImg, title: 'Mamie bergère pour ses 90 ans', subtitle: 'Crayon sur papier Canson', description: '2018' },
    ],
  },
];
