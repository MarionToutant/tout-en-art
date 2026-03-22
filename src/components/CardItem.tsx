import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import CardDialog from './CardDialog';

interface ICardItemProps {
  readonly mediaFile: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export default function CardItem({
  mediaFile,
  title,
  subtitle,
  description,
}: ICardItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          width: "100%",
          height: { xs: 300, sm: 360 },
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
          onClick={() => handleClick()}
        >
          <CardMedia sx={{ height: { xs: 180, sm: 230 }, flexShrink: 0, objectPosition: "top" }} component="img" src={mediaFile} alt={title ?? subtitle} />
          <CardContent sx={{ width: "100%", overflow: "hidden" }}>
            {title ? (
              <Typography variant="h6" noWrap>
                {title}
              </Typography>
            ) : null}
            {subtitle ? (
              <Typography variant="body2" color="text.secondary" fontStyle="italic" gutterBottom noWrap>
                {subtitle}
              </Typography>
            ) : null}
            {description ? (
              <Typography variant="body2" color="text.secondary" noWrap display="block">
                {description}
              </Typography>
            ) : null}
          </CardContent>
        </CardActionArea>
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
