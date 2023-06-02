import React from 'react';
import CardItem from '../../CardItem';

export default function PillCard() {
  return (
    <CardItem
      title="Pilule"
      subtitle="Feutres permanents sur papier Canson"
      description="2021"
      mediaFile={require("../../../media/landscapes/pill.jpg")}
    />
  )
}
