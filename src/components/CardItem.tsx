import React from 'react';
import Card from '@mui/material/Card';
import CardDialog from './CardDialog';
import CardBottom from './CardBottom';
import CardTop from './CardTop';

interface ICardItemProps {
  readonly mediaFile: string;
  readonly mediaType: "video" | "audio" | "picture" | "iframe" | "img";
  readonly mediaHeight?: number;
  readonly clickable?: boolean;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly demoLink?: string;
  readonly githubPath?: string;
  readonly githubBackendPath?: string;
  readonly githubFrontendPath?: string;
  readonly websiteUrl?: string;
  readonly downloadUrl?: string;
}

export default function CardItem({
  clickable = false,
  mediaFile,
  mediaType,
  mediaHeight,
  title,
  subtitle,
  description,
  demoLink,
  githubPath,
  githubFrontendPath,
  githubBackendPath,
  websiteUrl,
  downloadUrl,
}: ICardItemProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleCardClick = () => {
    if (demoLink) {
      window.open(demoLink, "_blank", "noreferrer");
    } else {
      setIsDialogOpen(true);
    }
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
        <CardTop
          clickable={clickable}
          mediaFile={mediaFile}
          mediaType={mediaType}
          mediaHeight={mediaHeight}
          title={title}
          subtitle={subtitle}
          description={description}
          demoLink={demoLink}
          websiteUrl={websiteUrl}
          downloadUrl={downloadUrl}
          handleClick={handleCardClick}
        />
        <CardBottom
          githubPath={githubPath}
          githubFrontendPath={githubFrontendPath}
          githubBackendPath={githubBackendPath}
          websiteUrl={websiteUrl}
          downloadUrl={downloadUrl}
        />
      </Card>
      <CardDialog
        isOpen={isDialogOpen}
        handleClose={closeDialog}
        mediaFile={mediaFile}
        mediaType={mediaType}
        title={title}
        subtitle={subtitle}
        description={description}
      />
    </>
  );
}