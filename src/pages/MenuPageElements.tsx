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
        title="Portraits"
        navigationPath="/portraits"
        isSelected={pathName === "/portraits"}
      />
      <MenuElement
        isHome={false}
        title="Paysages"
        navigationPath="/paysages"
        isSelected={pathName === "/paysages"}
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