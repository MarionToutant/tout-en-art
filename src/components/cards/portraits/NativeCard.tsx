import React from 'react';
import CardItem from '../../CardItem';

export default function NativeCard() {
  return (
    <CardItem
      title="Autochtone"
      subtitle="Acrylique sur papier Canson"
      description="2011"
      mediaFile={require("../../../media/portraits/native.jpg")}
    />
  )
}
