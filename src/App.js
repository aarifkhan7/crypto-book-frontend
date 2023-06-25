import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";

import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import useToken from "./useToken";
import MyAppBar from "./MyAppBar";

let baseurl = "https://crypto-book-server.onrender.com";

function App() {

  // get auth status
  const [ token, setToken ] = useToken();
  let history = useHistory();

  console.log(token);

  function checkLogin(data){
    let requsername = data.username;
    let reqpassword = data.password;

    fetch(baseurl + '/auth', {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      cache: "no-store",
      body: JSON.stringify({
        username: requsername,
        password: reqpassword
      })
    }).then(async (res) => {
      if(res.status === 200){
        let data = await res.json();
        setToken(data.token);
        history.push('/');
        window.location.reload();
      }else{
        alert('Wrong credentials!');
      }
    })
  }

  function logOut(){
    setToken(null);
  }

  if(!token){
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login checkLogin={checkLogin} />
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/">
              <Login checkLogin={checkLogin} />
            </Route>
          </Switch>
        </BrowserRouter>
    );
  }else{

    return (
      <>
        <MyAppBar logOut={logOut}></MyAppBar>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login checkLogin={checkLogin}/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route path="/">
              <Dashboard/>
            </Route>
          </Switch>
        </BrowserRouter>
        </>
    );

  }
}

export default App;
