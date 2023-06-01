import React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import EyeIcon from '@mui/icons-material/Visibility';
import GithubIcon from '@mui/icons-material/GitHub';

interface ICardBottomProps {
  readonly githubPath?: string;
  readonly githubBackendPath?: string;
  readonly githubFrontendPath?: string;
  readonly websiteUrl?: string;
  readonly downloadUrl?: string;
}

export default function CardBottom({
  githubPath,
  githubFrontendPath,
  githubBackendPath,
  websiteUrl,
  downloadUrl,
}: ICardBottomProps) {
  return (
    <CardActions>
      {websiteUrl ? (
        <Button size="small" variant="outlined" href={websiteUrl} startIcon={<EyeIcon />}>Voir</Button>
      ) : null}
      {downloadUrl ? (
        <Button size="small" variant="outlined" href={downloadUrl} startIcon={<DownloadIcon />}>Android</Button>
      ) : null}
      {githubPath ? (
        <Button size="small" href={`https://github.com/${githubPath}`} startIcon={<GithubIcon />}>Github</Button>
      ) : null}        
      {githubFrontendPath ? (
        <Button size="small" href={`https://github.com/${githubFrontendPath}`} startIcon={<GithubIcon />}>Frontend</Button>
      ) : null}
      {githubBackendPath ? (
        <Button size="small" href={`https://github.com/${githubBackendPath}`} startIcon={<GithubIcon />}>Backend</Button> 
      ) : null}
    </CardActions>
  );
}
