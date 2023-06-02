import React from 'react';
import CardItem from '../../CardItem';

export default function LeBlancCard() {
  return (
    <CardItem
      title="Ville du Blanc (concours, premier prix)"
      subtitle="Crayon sur papier Canson"
      description="2007"
      mediaFile={require("../../../media/youth/le-blanc.jpg")}
    />
  )
}
