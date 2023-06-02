import React from 'react';
import CardItem from '../../CardItem';

export default function LimogesCard() {
  return (
    <CardItem
      title="Vue de Paris"
      subtitle="Acrylique sur trois toiles"
      description="2020"
      mediaFile={require("../../../media/landscapes/paris.jpg")}
    />
  )
}
