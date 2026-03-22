import hooligalImg from '../media/graffitis/hooligal.jpg';
import radioJulyImg from '../media/graffitis/radio-july.jpg';
import seagullImg from '../media/graffitis/seagull.jpg';

import concertImg from '../media/landscapes/concert.jpg';
import envulminuresImg from '../media/landscapes/envulminures.jpg';
import imaginaryWorldImg from '../media/landscapes/imaginary-world.jpg';
import limogesImg from '../media/landscapes/limoges.jpg';
import montrealImg from '../media/landscapes/montreal.jpg';
import nafelsImg from '../media/landscapes/nafels.jpg';
import parisImg from '../media/landscapes/paris.jpg';
import snowImg from '../media/landscapes/snow.jpg';

import dancerImg from '../media/portraits/dancer.jpg';
import elephantsImg from '../media/portraits/elephants.jpg';
import grandmotherImg from '../media/portraits/grandmother.jpg';

import bedroomGraffitiImg from '../media/youth/bedroom-graffiti.jpg';
import jocondeImg from '../media/youth/joconde.jpg';
import leBlancImg from '../media/youth/le-blanc.jpg';

export interface CardData {
  readonly mediaFile: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export interface Section {
  readonly title: string;
  readonly cards: readonly CardData[];
}

export const sections: Section[] = [
  {
    title: 'Graffitis',
    cards: [
      { mediaFile: hooligalImg, title: 'Hooligal', subtitle: 'Bombes de peinture', description: '2022' },
      { mediaFile: seagullImg, title: 'Mouette et paquet de chips', subtitle: 'Bombes de peinture', description: '2022' },
      { mediaFile: radioJulyImg, title: 'Radio July', subtitle: 'Bombes de peinture', description: '2023' },
    ],
  },
  {
    title: 'Paysages & Objets',
    cards: [
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
    cards: [
      { mediaFile: elephantsImg, title: 'Eléphants', subtitle: "Peinture à l'huile au couteau sur papier Canson", description: '2013' },
      { mediaFile: dancerImg, title: 'Danseuse', subtitle: 'Acrylique sur papier Canson', description: '2012' },
      { mediaFile: grandmotherImg, title: 'Mamie bergère pour ses 90 ans', subtitle: 'Crayon sur papier Canson', description: '2018' },
    ],
  },
  {
    title: 'Jeunesse',
    cards: [
      { mediaFile: jocondeImg, title: 'La Joconde', subtitle: 'Pastel gras sur papier Canson', description: '2006' },
      { mediaFile: leBlancImg, title: 'Ville du Blanc (concours)', subtitle: 'Crayon sur papier Canson', description: '2007' },
      { mediaFile: bedroomGraffitiImg, title: 'Premier graffiti', subtitle: 'Peinture industrielle', description: '2000' },
    ],
  },
];
