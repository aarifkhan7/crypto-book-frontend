import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function MyAppBar({logOut}){
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button color="inherit" onClick={logOut}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    );
}