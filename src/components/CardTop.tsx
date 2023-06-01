import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MobileAppIcon from '@mui/icons-material/PhoneAndroid';
import WebsiteIcon from '@mui/icons-material/Web';
import Grid from '@mui/material/Grid';

interface ICardTopProps {
  readonly handleClick: () => void;
  readonly mediaFile: string;
  readonly mediaType: "video" | "audio" | "picture" | "iframe" | "img";
  readonly mediaHeight?: number;
  readonly clickable?: boolean;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly demoLink?: string;
  readonly websiteUrl?: string;
  readonly downloadUrl?: string;
}

export default function CardTop({
  handleClick,
  clickable,
  mediaFile,
  mediaType,
  mediaHeight,
  title,
  subtitle,
  description,
  demoLink,
  websiteUrl,
  downloadUrl,
}: ICardTopProps) {
  return (
    <CardActionArea
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      disableRipple={clickable || demoLink ? false : true}
      disabled={clickable || demoLink ? false : true}
      onClick={clickable || demoLink ? () => handleClick() : () => null}
    >
      {demoLink ? (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          href={demoLink}
          sx={{ position: "absolute", left: 10, top: 10 }}
        >
          Démo
        </Button>
      ) : null}
      <CardMedia sx={{ height: mediaHeight }} component={mediaType} src={mediaFile} alt={title ?? subtitle} />
      <CardContent>
        {title ? (
          <Typography variant="h5" textTransform="uppercase" gutterBottom>
            {title}
          </Typography>
        ) : null}
        <Grid container display="flex" spacing={1} marginBottom="15px" color="text.secondary">
          {websiteUrl ? (
            <Grid item display="flex">
              <WebsiteIcon sx={{ alignSelf: "center" }} />
            </Grid>
          ) : null}
          {downloadUrl ? (
            <Grid item display="flex">
              <MobileAppIcon sx={{ alignSelf: "center", marginLeft: "-3px" }} />
            </Grid>
          ) : null}
          {subtitle ? (
            <Grid item>
              <Typography variant="h6" display="flex">
                {subtitle}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        {description ? (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        ) : null}
      </CardContent>
    </CardActionArea>
  );
}
