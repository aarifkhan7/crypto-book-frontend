import {Box, Container, Typography} from '@mui/material';

export default function Header(){
    return (
        <Box mt={8} mb={8}>
            <Container>
                <Typography variant="h3">
                    <center>
                        Crypto Coins Address Book
                    </center>
                </Typography>
            </Container>
        </Box>
    );
}