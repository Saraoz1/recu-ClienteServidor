import axios from "axios";
import React, {Fragment, useState} from "react";
import {BrowserRouter as Route, HashRouter} from "react-router-dom";
import {BrowserRouter as Switch} from "react-router-dom";
import Profile from "../profile/Profile";
import "./Login.css";

function App() {

  const[datos, setDatos] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (event) =>{
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }
  
  const  enviarDatos = (event) =>{
    event.preventDefault();
  }

  <HashRouter>
    <Switch>
      <Route exact path="/Profile">
            <Profile/>
      </Route>
    </Switch>
  </HashRouter>

  var postData = {
    "username" : datos.username,
    "password" : datos.password
  }


  const consumir_login = () => {
    axios
    .post("http://localhost:8000/api/v1/login",postData, {
      Headers: { "Content-Type": "application/json", },
    })
      .then(response => {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        alert("Bienvenido");
        window.location="/Profile";
       })
      .catch((error) => {
        alert("Datos Incorrectos")
        console.log(error.response.data.password[0]);
        console.log(error.response.data.username[0]);
      });
  };




  return (
    <Fragment>
      <h1>Login</h1>
      <form className="form-login" onSubmit={enviarDatos}>
        <div className="div-form">
          <input
            placeholder= "Usuario"
            className="form-input"
            type="text"
            name="username"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="div-form">
          <input
            placeholder="Contraseña"
            className="form-input"
            type="text"
            name="password"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="div-form">
          <button onClick={consumir_login}>Ok</button>
        </div>
      </form>
    </Fragment>
  )

  
}



export default App;