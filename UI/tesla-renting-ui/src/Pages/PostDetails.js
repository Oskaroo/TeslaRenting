import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import News from "../newsData.json";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      const newsItem = News.find((item) => item.id.toString() === id);
      setSelectedNews(newsItem);
      setLoading(false);
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!selectedNews) {
    return (
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          style={{ marginTop: "20px" }}
        >
          Post nie został znaleziony.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card
        raised
        sx={{
          backgroundImage: `url(${
            selectedNews.imageUrl || "default_background.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          mt: 2,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)" }}
          >
            {selectedNews.name}
          </Typography>
          <Typography variant="body1" component="div">
            {selectedNews.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostDetails;
