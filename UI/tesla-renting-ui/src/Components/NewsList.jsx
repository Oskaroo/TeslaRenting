import React from "react";
import News from "../newsData.json";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const NewsList = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Aktualności
      </Typography>
      <Grid container spacing={3}>
        {News.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsList;
