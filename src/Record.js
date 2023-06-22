import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';

let baseurl = "https://crypto-book-server.onrender.com";


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

    const [copyAlert, setCopyAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [id, setId] = useState(props._id);

    function copy(){
        navigator.clipboard.writeText(props.address);
        setCopyAlert(true);
        setTimeout(() => {
            setCopyAlert(false);
        }, 1500);
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
            console.log(err);
        });
    }

    return (
        <Box>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5">
                        {props.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.coinName}
                    </Typography>
                    <Typography variant="body1">
                        {props.address}
                    </Typography>
                </CardContent>
                <CardActions>
                        <Button size="small" variant="contained" onClick={copy}>Copy</Button>
                        <IconButton><Icon>edit</Icon></IconButton>
                        <IconButton onClick={deleteRecord}><Icon>delete</Icon></IconButton>
                        {copyAlert && 
                            <Alert variant='outline' severity='success'></Alert>
                        }
                        {errorAlert && 
                            <Alert variant='outline' severity='error'></Alert>
                        }
                </CardActions>
            </Card>
        </Box>
    );
}