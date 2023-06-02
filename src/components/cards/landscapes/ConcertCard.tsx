import React from 'react';
import CardItem from '../../CardItem';

export default function ConcertCard() {
  return (
    <CardItem
      title="Concert"
      subtitle="Acrylique sur toile"
      description="2009"
      mediaFile={require("../../../media/landscapes/concert.jpg")}
    />
  )
}
