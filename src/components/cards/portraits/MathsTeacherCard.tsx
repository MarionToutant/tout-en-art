import React from 'react';
import CardItem from '../../CardItem';

export default function MathsTeacherCard() {
  return (
    <CardItem
      title="Mon professeur de maths"
      subtitle="Crayon sur feuille à carreaux"
      description="2010"
      mediaFile={require("../../../media/portraits/maths-teacher.jpg")}
    />
  )
}
