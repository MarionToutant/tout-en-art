import React from 'react';
import CardItem from '../../CardItem';

export default function ImaginaryWorldCard() {
  return (
    <CardItem
      title="Paysage fantastique"
      subtitle="Acrylique sur toile"
      description="2013"
      mediaFile={require("../../../media/landscapes/imaginary-world.jpg")}
    />
  )
}
