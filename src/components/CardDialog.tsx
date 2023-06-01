import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import CardMedia from '@mui/material/CardMedia';

interface ICardDialogProps {
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly mediaFile: string;
  readonly mediaType: "video" | "audio" | "picture" | "iframe" | "img";
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export default function CardDialog({
  isOpen,
  handleClose,
  mediaFile,
  mediaType,
  title,
  subtitle,
  description
}: ICardDialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogTitle>
        {title ? <Typography variant="h5" gutterBottom textTransform="uppercase">{title}</Typography> : null}
        {subtitle ? <Typography>{subtitle}</Typography> : null}
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
      <DialogContent>
        <CardMedia
          sx={{ height: "100%" }}
          component={mediaType}
          src={mediaFile}
          alt={title ?? subtitle}
        />
        {description ? (
          <DialogContentText paddingTop="16px" fontStyle="italic">
            <Typography>{description}</Typography>
          </DialogContentText>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
