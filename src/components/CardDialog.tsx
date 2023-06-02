import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

interface ICardDialogProps {
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly mediaFile: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export default function CardDialog({
  isOpen,
  handleClose,
  mediaFile,
  title,
  subtitle,
  description
}: ICardDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullScreen>
      <DialogTitle>
        <IconButton
          aria-label="Fermer"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          sx={{ objectFit: "contain", height: "100%" }}
          component="img"
          src={mediaFile}
          alt={title ?? subtitle}
        />
        {title || subtitle || description ? (
          <Grid paddingTop="16px">
            {title ? <DialogContentText variant="h6" color="text.primary">{title}</DialogContentText> : null}
            {title ? <DialogContentText variant="body1" fontStyle="italic" gutterBottom>{subtitle}</DialogContentText> : null}
            {title ? <DialogContentText variant="body2">{description}</DialogContentText> : null}
          </Grid>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
