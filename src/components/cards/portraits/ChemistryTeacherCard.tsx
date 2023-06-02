import React from 'react';
import CardItem from '../../CardItem';

export default function ChemistryTeacherCard() {
  return (
    <CardItem
      title="Mon professeur de chimie pour sa retraite"
      subtitle="Pastel sur papier Canson"
      description="2011"
      mediaFile={require("../../../media/portraits/chemistry-teacher.jpg")}
    />
  )
}
