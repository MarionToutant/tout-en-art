import React from 'react';
import CardItem from '../../CardItem';

export default function GrandmotherCard() {
  return (
    <CardItem
      title="Mamie bergère pour ses 90 ans"
      subtitle="Crayon sur papier Canson"
      description="2018"
      mediaFile={require("../../../media/portraits/grandmother.jpg")}
    />
  )
}
