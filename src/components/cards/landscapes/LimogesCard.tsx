import React from 'react';
import CardItem from '../../CardItem';

export default function LimogesCard() {
  return (
    <CardItem
      title="Limoges, rue de la Boucherie"
      subtitle="Acrylique sur deux toiles"
      description="2014"
      mediaFile={require("../../../media/landscapes/limoges.jpg")}
    />
  )
}
