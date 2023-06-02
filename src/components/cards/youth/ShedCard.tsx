import React from 'react';
import CardItem from '../../CardItem';

export default function ShedCard() {
  return (
    <CardItem
      title="Cabanon"
      subtitle="Pastel gras sur papier Canson"
      description="2001"
      mediaFile={require("../../../media/youth/shed.jpg")}
    />
  )
}
