import React from 'react';
import CardItem from '../../CardItem';

export default function PinkCityCard() {
  return (
    <CardItem
      title="Ville rose"
      subtitle="Acrylique sur toile"
      description="2011"
      mediaFile={require("../../../media/landscapes/pink-city.jpg")}
    />
  )
}
