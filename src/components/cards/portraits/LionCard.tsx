import React from 'react';
import CardItem from '../../CardItem';

export default function LionCard() {
  return (
    <CardItem
      title="Lion"
      subtitle="Acrylique sur tabouret"
      description="2017"
      mediaFile={require("../../../media/portraits/lion.jpg")}
    />
  )
}
