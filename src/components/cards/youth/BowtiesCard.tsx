import React from 'react';
import CardItem from '../../CardItem';

export default function BowtiesCard() {
  return (
    <CardItem
      title="Noeuds papillons"
      subtitle="Crayons de couleur sur papier"
      description="2002"
      mediaFile={require("../../../media/youth/bowties.jpg")}
    />
  )
}
