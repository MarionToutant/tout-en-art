import React from 'react';
import CardItem from '../../CardItem';

export default function SeagullCard() {
  return (
    <CardItem
      title="Mouette et paquet de chips"
      subtitle="Bombes de peinture"
      description="2022"
      mediaFile={require("../../../media/graffitis/seagull.jpg")}
    />
  )
}
