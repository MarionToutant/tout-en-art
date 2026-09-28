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
import gonzaloImg from '../media/gonzalo.jpg';
import cassetteImg from '../media/cassette.jpg';
import sodaCanImg from '../media/soda-can.jpg';
import unknownPortraitImg from '../media/unknown-portrait.jpg';
import radioJulyPhoneCaseImg from '../media/radio-july-phone-case.jpg';
import radioJulyShirtsImg from '../media/t-shirts-radio-july.jpg';
import radioJulyStickersImg from '../media/radio-july-stickers.jpg';
import camilleAndCharlesImg from '../media/camille-and-charles.jpg';
import claudiusImg from '../media/claudius.jpg';
import patrickImg from '../media/patrick.jpg';
import organicFormsImg from '../media/organic-forms.jpg';
import islandHouseImg from '../media/island-house.jpg';
import coloredIntestinesImg from '../media/colored-intestines.jpg';
import saintAndButterfliesImg from '../media/saint-and-butterflies.jpg';
import dildoImg from '../media/dildo.jpg';
import liveTechnoPosterImg from '../media/live-techno-poster.jpg';

export const sections: Section[] = [
  {
    title: 'Animaux',
    coverMediaFile: seagullImg,
    bubbles: [
      { mediaFile: elephantsImg, title: 'Éléphants', subtitle: "Peinture à l'huile au couteau", year: '2013' },
      { mediaFile: seagullImg, title: 'Mouette', subtitle: 'Bombes de peinture', year: '2021' },
    ],
  },
  {
    title: 'Lieux',
    coverMediaFile: imaginaryWorldImg,
    bubbles: [
      { mediaFile: concertImg, title: 'Concert', subtitle: 'Acrylique sur toile', year: '2009' },
      { mediaFile: imaginaryWorldImg, title: 'Paysage fantastique', subtitle: 'Acrylique sur toile', year: '2013' },
      { mediaFile: parisImg, title: 'Vue de Paris', subtitle: 'Acrylique sur trois toiles', year: '2020' },
      { mediaFile: montrealImg, title: 'Escaliers de Montréal', subtitle: 'Acrylique sur toile', year: '2012' },
      { mediaFile: limogesImg, title: 'Limoges, rue de la Boucherie', subtitle: 'Acrylique sur deux toiles', year: '2012' },
      { mediaFile: nafelsImg, title: 'Montagne à Nafels', subtitle: 'Acrylique sur toile', year: '2011' },
      { mediaFile: snowImg, title: 'Neige au Québec', subtitle: 'Acrylique sur toile', year: '2011' },
      { mediaFile: islandHouseImg, title: 'Maison sur l\'ile', subtitle: 'Feutre et aquarelle', year: '2026' },
    ],
  },
  {
    title: 'Portraits',
    coverMediaFile: claudiusImg,
    bubbles: [
      { mediaFile: dancerImg, title: 'Danseuse', subtitle: 'Acrylique', year: '2012' },
      { mediaFile: grandmotherImg, title: 'Mamie bergère', subtitle: 'Crayon', year: '2018' },
      { mediaFile: gonzaloImg, title: 'Gonzalo', subtitle: 'Collage d\'aquarelle et paillettes', year: '2024' },
      { mediaFile: unknownPortraitImg, title: 'Inconnue', subtitle: 'Feutre', year: '2024' },
      { mediaFile: camilleAndCharlesImg, title: 'Camille et Charles', subtitle: 'Feutre et aquarelle', year: '2024' },
      { mediaFile: claudiusImg, title: 'Claudius', subtitle: 'Feutre et aquarelle', year: '2024' },
      { mediaFile: patrickImg, title: 'Patrick', subtitle: 'Fusain', year: '2025' },
      { mediaFile: saintAndButterfliesImg, title: 'Saint et papillons', subtitle: 'Collage', year: '2026' },
    ],
  },
  {
    title: 'Concepts',
    coverMediaFile: cassetteImg,
    bubbles: [
      { mediaFile: envulminuresImg, title: 'Envulminures', subtitle: 'Feutre', year: '2023' },
      { mediaFile: cassetteImg, title: 'Cassette', subtitle: 'Feutre et aquarelle', year: '2024' },
      { mediaFile: sodaCanImg, title: 'Canette', subtitle: 'Feutre et aquarelle', year: '2024' },
      { mediaFile: organicFormsImg, title: 'Formes organiques', subtitle: 'Feutre et aquarelle', year: '2026' },
      { mediaFile: coloredIntestinesImg, title: 'Intestins colorés', subtitle: 'Feutre et aquarelle', year: '2026' },
      { mediaFile: dildoImg, title: 'Dildo', subtitle: 'Céramique et peinture', year: '2026' },
    ],
  },
  {
    title: 'Publicité',
    coverMediaFile: hooligalImg,
    bubbles: [
      { mediaFile: radioJulyImg, title: 'Radio July', subtitle: 'Bombe de peinture', year: '2023' },
      { mediaFile: hooligalImg, title: 'Hooligal', subtitle: 'Bombe de peinture', year: '2022' },
      { mediaFile: radioJulyPhoneCaseImg, title: 'Coque Radio July', year: '2025' },
      { mediaFile: radioJulyShirtsImg, title: 'T-shirts Radio July', subtitle: 'Feutre pour vêtement', year: '2025' },
      { mediaFile: radioJulyStickersImg, title: 'Autocollants Radio July', year: '2025' },
      { mediaFile: liveTechnoPosterImg, title: 'Live Techno à La Récré', subtitle: 'Affiche événementielle', year: '2026' },
    ],
  },
];
