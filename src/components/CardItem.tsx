import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import EyeIcon from '@mui/icons-material/Visibility';
import CardDialog from './CardDialog';

interface ICardItemProps {
  readonly mediaFile: string;
  readonly clickable?: boolean;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export default function CardItem({
  clickable = false,
  mediaFile,
  title,
  subtitle,
  description,
}: ICardItemProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleClick = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card
        raised
        sx={{
          width: 350,
          height: 430,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          disableRipple={clickable ? false : true}
          disabled={clickable ? false : true}
          onClick={clickable ? () => handleClick() : () => null}
        >
          <CardMedia sx={{ height: 230 }} component="img" src={mediaFile} alt={title ?? subtitle} />
          <CardContent>
            {title ? (
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography variant="body1" color="text.secondary" fontStyle="italic" gutterBottom>
                {subtitle}
              </Typography>
            ) : null}
            {description ? (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            ) : null}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="outlined" onClick={() => handleClick()} startIcon={<EyeIcon />}>Voir</Button>
        </CardActions>
      </Card>
      <CardDialog
        isOpen={isDialogOpen}
        handleClose={closeDialog}
        mediaFile={mediaFile}
        title={title}
        subtitle={subtitle}
        description={description}
      />
    </>
  );
}
