import React from 'react';
import CardItem from '../../CardItem';

export default function ElephantsCard() {
  return (
    <CardItem
      title="Eléphants"
      subtitle="Peinture à l'huile au couteau sur papier Canson"
      description="2013"
      mediaFile={require("../../../media/portraits/elephants.jpg")}
    />
  )
}
