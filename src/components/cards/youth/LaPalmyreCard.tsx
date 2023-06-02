import React from 'react';
import CardItem from '../../CardItem';

export default function LaPalmyreCard() {
  return (
    <CardItem
      title="Plage de la Palmyre"
      subtitle="Aquarelle sur papier Canson"
      description="2003"
      mediaFile={require("../../../media/youth/la-palmyre.jpg")}
    />
  )
}
