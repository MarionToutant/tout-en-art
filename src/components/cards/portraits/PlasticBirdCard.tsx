import React from 'react';
import CardItem from '../../CardItem';

export default function PlasticBirdCard() {
  return (
    <CardItem
      title="Oiseau mort rempli de plastique"
      subtitle="Aquarelle sur papier Canson"
      description="2021"
      mediaFile={require("../../../media/portraits/plastic-bird.jpg")}
    />
  )
}
