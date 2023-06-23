import { Container, TextField, Typography, MenuItem, Button, ButtonGroup, Icon, Box } from '@mui/material';
import {useState} from 'react';

let baseurl = process.env.BASEURL;

function SaveIcon(){
    return (
        <Icon>
            save
        </Icon>
    );
}

function CancelIcon(){
    return (
        <Icon>
            cancel
        </Icon>
    );
}

export default function NewRecordForm({setDataState, addRecordInList}){
    const [formDisabled, setFormDisabled] = useState(false);
    const [reqname, setReqName] = useState('');
    const [reqaddr, setReqAddr] = useState('');
    const [reqcoin, setReqCoin] = useState('Bitcoin');

    function handleSave(e){
        if(reqname == '' || reqaddr == '' || reqcoin == ''){
            alert('Fill the required fields.');
            return;
        }
        setFormDisabled(true);
        fetch(baseurl + '/records/', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: reqname,
                address: reqaddr,
                coinName: reqcoin
            }),
            cache: "no-store"
        }).then(res => res.json()).then(data => {
            if(data.acknowledged == false){
                setDataState('error');
                setFormDisabled(false);
                return;
            }
            setFormDisabled(false);
            addRecordInList({
                _id: data.insertedId,
                name: reqname,
                address: reqaddr,
                coinName: reqcoin
            });
            setDataState('complete');
        }).catch((err) => {
            setDataState('error');
            return;
        });
    }

    return (
        <Box mt={2}>
            <Container>
                <Typography variant='h4'>
                    Insert new address
                </Typography>
                <form>
                    <TextField disabled={formDisabled} value={reqname} onChange={(e)=>{setReqName(e.target.value);}} label="Name" required margin='dense'></TextField><br/>
                    <TextField disabled={formDisabled} value={reqaddr} onChange={(e)=>{setReqAddr(e.target.value)}} label="Address" required margin='dense'></TextField><br/>
                    <TextField disabled={formDisabled} value={reqcoin} onChange={(e)=>{setReqCoin(e.target.value);}} select defaultValue="Bitcoin" required margin='dense'>
                        <MenuItem key='Bitcoin' value='Bitcoin'>
                            Bitcoin
                        </MenuItem>
                        <MenuItem key='Ethereum' value='Ethereum'>
                            Ethereum
                        </MenuItem>
                        <MenuItem key='DogeCoin' value='Doge Coin'>
                            Doge Coin
                        </MenuItem>
                    </TextField><br/>
                    <ButtonGroup style={{marginTop:10, marginBottom: 10}}>
                        <Button disabled={formDisabled} variant='contained' margin='dense' startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                        <Button disabled={formDisabled} variant='contained' margin='dense' startIcon={<CancelIcon />} onClick={()=>{setDataState('complete'); setFormDisabled(false)}}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </Container>
        </Box>
    );
}