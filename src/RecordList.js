import Record from './Record';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function RecordList({records, deleteRecordFromList, reloadData}){
    
    
    const recordsList = records.map((data) => 
        <Grid item xs={12} sm={3}>
            <Record reloadData={reloadData} _id={data._id} name={data.name} address={data.address} coinName={data.coinName} deleteRecordFromList={deleteRecordFromList}></Record>
        </Grid>
    );
    
    return (
        <Container>
          {recordsList.length === 0 && (<h1>Nothing found!</h1>)}
          <Grid container spacing={2}>
            {recordsList}
          </Grid>
        </Container>
    );
}