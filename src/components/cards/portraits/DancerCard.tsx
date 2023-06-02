import React from 'react';
import CardItem from '../../CardItem';

export default function DancerCard() {
  return (
    <CardItem
      title="Danseuse"
      subtitle="Acrylique sur papier Canson"
      description="2012"
      mediaFile={require("../../../media/portraits/dancer.jpg")}
    />
  )
}
