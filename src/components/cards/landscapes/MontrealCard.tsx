import React from 'react';
import CardItem from '../../CardItem';

export default function MontrealCard() {
  return (
    <CardItem
      title="Escaliers de Montréal"
      subtitle="Acrylique sur toile"
      description="2012"
      mediaFile={require("../../../media/landscapes/montreal.jpg")}
    />
  )
}
