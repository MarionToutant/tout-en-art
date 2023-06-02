import React from 'react';
import CardItem from '../../CardItem';

export default function JocondeCard() {
  return (
    <CardItem
      title="La Joconde"
      subtitle="Pastel gras sur papier Canson"
      description="2006"
      mediaFile={require("../../../media/youth/joconde.jpg")}
    />
  )
}
