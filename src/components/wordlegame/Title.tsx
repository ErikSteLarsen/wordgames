import { Box, Typography } from "@mui/material";
import React from "react";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {

  return (
    <Box textAlign="center" mt={4} mb={10}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
}

export default Title;