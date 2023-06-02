import React from 'react';
import CardItem from '../../CardItem';

export default function CousinsCard() {
  return (
    <CardItem
      title="Mes cousins"
      subtitle="Pastel ocre sur papier Canson"
      description="2020"
      mediaFile={require("../../../media/portraits/cousins.jpg")}
    />
  )
}
