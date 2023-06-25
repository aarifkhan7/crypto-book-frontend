import {CircularProgress, Container} from "@mui/material";
import RecordList from "./RecordList";
import SearchBar from "./SearchBar";
import Header from "./Header";
import ErrorPage from "./ErrorPage";
import NewRecordForm from "./NewRecordForm";
import { useState, useEffect } from "react";
import useToken from "./useToken";

let baseurl = "https://crypto-book-server.onrender.com";

function Dashboard() {
  const [dataState, setDataState] = useState('complete');
  const [records, setRecords] = useState(null);
  const [ token ] = useToken();

  useEffect(() => {
    async function fetchData () {
      console.log(baseurl);
      let data = await fetch(baseurl + '/records', {
        method: "GET",
        credentials: "include",
        headers: {
          'x-access-token': token
        }
      });
      if(data.status === 200){
        data = await data.json();
        setRecords(data);
        setDataState('complete');
        return () => {};
      }else if(data.status === 500){
        setDataState('error');
      }
    };
    fetchData();
  }, []);

  function addRecordInList(newobj){
    setRecords([
      ...records,
      newobj
    ]);
  }

  function deleteRecordFromList(objid){
    setRecords(
      records.filter(a => a._id !== objid)
    );
    // console.log("delete request for "+objid);
  }

  async function reloadData(){
    let data = await fetch(baseurl + '/records',{
      method: "GET",
      credentials: "include",
      headers:{
        'x-access-token': token
      }
    });
    if(data.status === 200){
      data = await data.json();
      setRecords(data);
      setDataState('complete');
    }else if(data.status === 500){
      setDataState('error');
    }
    return true;
  }

  return (
    <>
      <Header></Header>
      <SearchBar setRecords={setRecords} setDataState={setDataState} />
      {dataState === 'fetching' && (
        <Container>
          <center>
            <CircularProgress></CircularProgress>
          </center>
        </Container>
      )}
      {dataState === 'complete' && records != null && (
        <RecordList reloadData={reloadData} records={records} deleteRecordFromList={deleteRecordFromList} />
      )}
      {dataState === 'error' && (
        <ErrorPage></ErrorPage>
      )}
      {dataState === 'newrecord' && (
        <NewRecordForm setDataState={setDataState} addRecordInList={addRecordInList}></NewRecordForm>
      )}
    </>
  )
}

export default Dashboard;
