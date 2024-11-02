import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { Email, Phone, LocationOn, Business } from "@mui/icons-material";

const Contact = () => {
  const fakeContactData = {
    company: "TeslaRenting w Majorce",
    address: "ul. Główna 123, Majorka, Hiszpania",
    email: "info@teslarenting-mallorca.com",
    phone: "+123 456 7890",
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Skontaktuj się z nami
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Jeśli masz jakieś pytania lub potrzebujesz pomocy, jesteśmy tutaj, aby
          pomóc!
        </Typography>
      </Box>

      <Card
        sx={{ maxWidth: 600, margin: "0 auto", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton>
              <Business color="primary" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Firma:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {fakeContactData.company}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box display="flex" alignItems="center" mt={2} mb={2}>
            <IconButton>
              <LocationOn color="primary" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Adres:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {fakeContactData.address}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box display="flex" alignItems="center" mt={2} mb={2}>
            <IconButton>
              <Email color="primary" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Email:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {fakeContactData.email}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box display="flex" alignItems="center" mt={2}>
            <IconButton>
              <Phone color="primary" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Telefon:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {fakeContactData.phone}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Contact;
