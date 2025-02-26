import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Link,
  AppBar,
  Toolbar,
} from "@mui/material";

const InfoPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "calc(100vh - 40px)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to InfoPage
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your go-to source for all the information you need.
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1" gutterBottom>
            InfoPage is designed to provide you with the latest and most
            relevant information on a variety of topics. Whether you're looking
            for tech news, health tips, or travel guides, we've got you covered.
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <List>
            <ListItem>Up-to-date information</ListItem>
            <ListItem>Expert insights</ListItem>
            <ListItem>User-friendly interface</ListItem>
            <ListItem>Comprehensive guides</ListItem>
          </List>
        </Box>
        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Have questions or feedback? Reach out to us at{" "}
            <Link href="mailto:info@infopage.com">info@infopage.com</Link>.
          </Typography>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 InfoPage. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default InfoPage;
