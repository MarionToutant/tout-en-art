import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

interface IMenuElementProps {
  readonly isHome: boolean;
  readonly title: string;
  readonly navigationPath: string;
  readonly isSelected?: boolean;
  readonly logoFile?: string;
  readonly logoAlt?: string;
  readonly divider?: boolean;
}

export default function MenuElement({
  isHome,
  title,
  navigationPath,
  isSelected,
  logoFile,
  logoAlt,
  divider,
}: IMenuElementProps) {
  return (
    <NavLink to={navigationPath} style={{ textDecoration: 'none' }}>
      <ListItem
        key={navigationPath.substring(1)}
        sx={{ height: isHome ? "60px" : "50px" }}
        disablePadding
        divider={divider}
      >
        <ListItemButton selected={isSelected} disableRipple sx={{ height: isHome ? "60px" : "50px" }}>
          {logoFile ? (
            <ListItemIcon>
              <img
                src={require(`../media/${logoFile}`)}
                alt={logoAlt}
                width={30}
              />
            </ListItemIcon>
            )
          : null}
          <ListItemText sx={{ color: "text.primary" }}>
            {isHome ? (
              <Typography textTransform="uppercase" variant="h6">
                {title}
              </Typography>
            ) : title}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </NavLink>
  )
}