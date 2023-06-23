import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';
import { IconButton, TextField } from '@mui/material';

let baseurl = process.env.BASEURL;

// export default function Record(props){
//     return (
//         <Card sx={{ minWidth: 275 }}>
//             <CardContent>
//                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                     Word of the Day
//                 </Typography>

//             </CardContent>
//         </Card>
//     );
//     // return (
//     //     <h1>Hello, {props.name}</h1>
//     // );
// }
export default function Record(props) {

    const [SuccessAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [id] = useState(props._id);
    const [name, setName] = useState(props.name);
    const [addr, setAddr] = useState(props.address);
    const [coin, setCoin] = useState(props.coinName);
    const [formDisabled, setFormDisabled] = useState(false);

    function copy(){
        navigator.clipboard.writeText(addr);
        setSuccessAlert(true);
        setTimeout(() => {
            setSuccessAlert(false);
        }, 1500);
    }

    function handleEditSave(){
        setFormDisabled(true);
        fetch(baseurl + '/records', {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id: id,
                name: name,
                address: addr,
                coinName: coin
            }),
            cache: "no-store"
        }).then(res => res.json()).then((data) => {
            if(data.acknowledged === true){
                props.reloadData();
                setEditMode(false);
                setFormDisabled(false);
            }
        }).catch((err)=>{
            console.log(err);
            setFormDisabled(false);
        });
    }
    
    function handleEditCancel(){
        setName(props.name);
        setAddr(props.address);
        setCoin(props.coinName);
        setEditMode(false);
        setFormDisabled(false);
    }

    function deleteRecord(){
        // console.log(id);
        fetch(baseurl + '/records', {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id
            }),
            cache: "no-store"
        }).then(res => res.json()).then(data => {
            if(data.acknowledged !== true){
                alert('failed');
            }else{
                props.deleteRecordFromList(id);
            }
        }).catch(err => {
            setErrorAlert(true);
            console.log(err);
        });
    }

    return (
        <Box>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    { editMode === false && (
                        <>
                            <Typography variant="h5">
                                {name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {coin}
                            </Typography>
                            <Typography variant="body1">
                                {addr}
                            </Typography>
                        </>
                    )}
                    {
                        editMode && (
                            <>
                                <TextField disabled={formDisabled} required defaultValue={name} size="small" onChange={(e)=>{setName(e.target.value);}}></TextField>
                                <TextField disabled={formDisabled} required defaultValue={addr} size="small" onChange={(e)=>{setAddr(e.target.value);}}></TextField><br></br>
                                <TextField disabled={formDisabled} required value={coin} size="small" onChange={(e)=>{setCoin(e.target.value);}} select defaultValue="Bitcoin" margin='dense'>
                                    <MenuItem key='Bitcoin' value='Bitcoin'>
                                        Bitcoin
                                    </MenuItem>
                                    <MenuItem key='Ethereum' value='Ethereum'>
                                        Ethereum
                                    </MenuItem>
                                    <MenuItem key='DogeCoin' value='Doge Coin'>
                                        Doge Coin
                                    </MenuItem>
                                </TextField>
                            </>
                        )
                    }
                </CardContent>
                <CardActions>
                    {editMode === false && (
                        <>
                            <Button size="small" variant="contained" onClick={copy}>Copy</Button>
                            <IconButton onClick={()=>{setEditMode(true);}}><Icon>edit</Icon></IconButton>
                            <IconButton onClick={deleteRecord}><Icon>delete</Icon></IconButton>
                            {SuccessAlert && 
                                <Alert variant='outline' severity='success'></Alert>
                            }
                            {errorAlert && 
                                <Alert variant='outline' severity='error'></Alert>
                            }
                        </>
                    )}
                    {
                        editMode && (
                            <ButtonGroup style={{margin:10, marginTop: -10}}>
                                <Button disabled={formDisabled} variant='contained' size="small" startIcon={<Icon>save</Icon>} onClick={handleEditSave}>Save</Button>
                                <Button disabled={formDisabled} variant='contained' size="small" startIcon={<Icon>cancel</Icon>} onClick={handleEditCancel}>Cancel</Button>
                            </ButtonGroup>
                        )
                    }
                </CardActions>
            </Card>
        </Box>
    );
}