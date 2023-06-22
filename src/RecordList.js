import Record from './Record';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function RecordList({records, deleteRecordFromList, reloadData}){
    // var records = [
    //     {
    //       id: 0,
    //       name: "Aarif Khan",
    //       address: "0x1234",
    //       coinName: "Bitcoin"
    //     },
    //     {
    //       id: 1,
    //       name: "Abhishek Chauhan",
    //       address: "0x5678",
    //       coinName: "Ethereum"
    //     },
    //     {
    //       id: 2,
    //       name: "Adish Chauhan",
    //       address: "0x9801",
    //       coinName: "ETH"
    //     },
    //     {
    //       id: 3,
    //       name: "Sukha Devi",
    //       address: "0x2345",
    //       coinName: "Tether"
    //     }
    //   ];
      
      // records = records.filter(data => (data.coinName === "Ethereum"));
    
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