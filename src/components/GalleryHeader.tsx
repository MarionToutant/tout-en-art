import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IGalleryHeaderProps {
  readonly title: string;
}

export default function GalleryHeader({ title }: IGalleryHeaderProps) {
  return (
    <Box component="header" className="gallery-header">
      <Box className="gallery-header__lockup">
        <Typography component="h1" variant="h1" className="gallery-header__title">
          {title}
        </Typography>
      </Box>
    </Box>
  );
}