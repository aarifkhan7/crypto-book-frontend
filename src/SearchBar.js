import { Button, Container, Icon, Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

let baseurl = "https://crypto-book-server.onrender.com";

export default function SearchBar({setRecords, setDataState}){
    const [searchQuery, setSearchQuery] = useState('');    
    const [searchAttr, setSearchAttr] = useState('All');

    function handleAttrChange(e){
      setSearchAttr(e.target.value);
    }

    function handleChange(e){
      setSearchQuery(e.target.value);
    }

    function handleKeyPress(e){
        if(e.key === 'Enter'){
          if(searchQuery === ''){
            setDataState('loading');
            fetch(`${baseurl}/records/`).then(res => res.json()).then(data => {
              setRecords(data);
              setDataState('complete');
            });
            return;
          }
          let endpoint = null;
          if(searchAttr === 'Name'){
            // let data = await fetch(`http://localhost:3100/records/name/${searchQuery}`);
            // if(data.status === 200){
            //   data = await data.json();
            //   setRecords(data);
            //   setDataState('complete');
            //   return () => {};
            // }else if(data.status === 500){
            //   setDataState('error');
            // }
            endpoint = `${baseurl}/records/name/${searchQuery}`;
          }else if(searchAttr === 'Address'){
            endpoint = `${baseurl}/records/address/${searchQuery}`;
          }else if(searchAttr === 'Coin'){
            endpoint = `${baseurl}/records/coin/${searchQuery}`;
          }else if(searchAttr === 'All'){
            endpoint = `${baseurl}/records/all/${searchQuery}`;
          }
          setDataState('loading');
          fetch(endpoint).then(res => res.json()).then(data => {
            // console.log(data);
            setRecords(data);
            setDataState('complete');
          });
        }
    }

    return (
      <Container>
        <Grid container spacing={2} my={2}>
          <Grid item md={2} sm={2}>
            <TextField select value={searchAttr} onChange={handleAttrChange} fullWidth defaultValue="All">
              <MenuItem key='all' value='All'>
                All
              </MenuItem>
              <MenuItem key='name' value='Name'>
                Name
              </MenuItem>
              <MenuItem key='address' value='Address'>
                Address
              </MenuItem>
              <MenuItem key='coinName' value='Coin'>
                Coin
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={8} sm={10}>
            <TextField required onChange={handleChange} onKeyPress={handleKeyPress} value={searchQuery} label="Filter...Press Enter to filter" fullWidth/>
          </Grid>
          <Grid item md={2} sm={12} alignItems='center'>
            <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={()=>{setDataState('newrecord');}}>
              New Address
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }