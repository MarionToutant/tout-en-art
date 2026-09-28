import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ITopBarProps {
  readonly title: string;
}

export default function TopBar({ title }: ITopBarProps) {
  return (
    <Box component="header" className="top-bar">
      <Box className="top-bar__lockup">
        <Typography component="h1" variant="h1" className="top-bar__title">
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
