import React from 'react';
import MenuElement from '../components/MenuElement';

interface IMenuPageElementsProps {
  readonly pathName: string;
}

export default function MenuPageElements({ pathName }: IMenuPageElementsProps) {
  return (
    <>
      <MenuElement
        isHome={false}
        title="Graffitis"
        navigationPath="/graffitis"
        isSelected={pathName === "/graffitis"}
      />
      <MenuElement
        isHome={false}
        title="Paysages / Objets"
        navigationPath="/paysages-objets"
        isSelected={pathName === "/paysages-objets"}
      />
      <MenuElement
        isHome={false}
        title="Portraits / Animaux"
        navigationPath="/portraits-animaux"
        isSelected={pathName === "/portraits-animaux"}
      />
      <MenuElement
        isHome={false}
        title="Jeunesse"
        navigationPath="/jeunesse"
        isSelected={pathName === "/jeunesse"}
      />
    </>
  )
}
