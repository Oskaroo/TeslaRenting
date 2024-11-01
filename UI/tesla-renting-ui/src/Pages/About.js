import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        O TeslaRenting
      </Typography>
      <Typography variant="body1">
        TeslaRenting na Majorce to Twoje najlepsze miejsce do wynajmu samochodów
        wysokiej klasy na Majorce. Z dogodnymi lokalizacjami na Lotnisku Palma,
        w Centrum Miasta Palma, Alcudia oraz Manacor, oferujemy wysokiej klasy
        usługi wynajmu, by Twoje doświadczenia na Majorce były wyjątkowe.
      </Typography>
      <Paper elevation={3} sx={{ my: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Dlaczego warto wybrać TeslaRenting?
        </Typography>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <AirportShuttleIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>Przyjazd na lotnisko Palma</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <LocationCityIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>Podróż po sercu Palmy</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success">
                <NaturePeopleIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>Wizyta w pięknej Alcudii</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="error">
                <DriveEtaIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography>Odkrywanie uroku Manacoru</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Paper>
      <Typography variant="body1" paragraph>
        Doświadcz Majorki w stylu i z troską o środowisko dzięki TeslaRenting.
        Jesteśmy zobowiązani do zapewnienia najlepszych opcji wynajmu na Twoje
        podróże, gwarantując komfortową i świadomą ekologicznie przygodę na
        wyspie.
      </Typography>
    </Container>
  );
};

export default About;
