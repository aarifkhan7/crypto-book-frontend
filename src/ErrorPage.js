import { Container, Typography } from "@mui/material";

export default function ErrorPage(){
    return (
        <Container>
          <center>
            <Typography variant="h3" color="red">
              Some. Error. Occured.
            </Typography>
          </center>
        </Container>
    );
}