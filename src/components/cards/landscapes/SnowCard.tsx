import React from 'react';
import CardItem from '../../CardItem';

export default function SnowCard() {
  return (
    <CardItem
      title="Neige au Québec"
      subtitle="Acrylique sur toile"
      description="2011"
      mediaFile={require("../../../media/landscapes/snow.jpg")}
    />
  )
}
