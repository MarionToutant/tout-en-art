import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface ITopBarProps {
  readonly height: number | Record<string, number>;
  readonly backgroundFile: string;
  readonly title: string;
  readonly subtitle?: string;
}

export default function TopBar({ height, backgroundFile, title, subtitle }: ITopBarProps) {
  return (
    <AppBar position="static" sx={{ height }}>
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: { xs: "12px", sm: "24px" },
          backgroundImage: `url(${backgroundFile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            padding: { xs: "12px", sm: "16px" },
          }}
        >
          <Typography variant="h3" textTransform="uppercase" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', sm: '3rem' } }}>
            {title}
          </Typography>
          {subtitle ? <Typography variant="h6">{subtitle}</Typography> : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
