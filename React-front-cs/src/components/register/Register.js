import axios from "axios";
import "./Register.css";
function App() {
  

  const consumir_register = () => {
    var postData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value,
      email: document.getElementById('email').value,
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value
  }
    axios
    .post("http://localhost:8000/api/v1/register/create_user/", postData, {
      Headers: { "Content-Type": "application/json", },
    })
    .then((response) => {
    console.log(response.data);
    })
    .catch((error) => {
    console.log(error.response.data);
    
    });
    };

  return (
    //   <div className="App">
    //    <h2>Form Register</h2>     
    //     <form class="form-register" >
    //             <input class="txt" type="text" name="usename" placeholder="Username" />
    //             <input class="txt" type="text" name="password" placeholder="Password" />
    //             <input class="txt" type="text" name="password2" placeholder="Confirm Password" />
    //             <input class="txt" type="text" name="email" placeholder="Email" />
    //             <input class="txt" type="text" name="first_name" placeholder="First Name" />
    //             <input class="txt" type="text" name="last_name" placeholder="Last Name" />
    //         </form>
    //         <header className="App-header">
    //     <button onClick={consumir_register}> Register</button>
    //   </header>
    //   </div>
    // );
    <div className="App">
      <header className="App-header">
      <h2>Register</h2>
       <input className="txt" type="text" id="username" placeholder="User" />
       <input className="txt" type="text" id="password" placeholder="Password" />
       <input className="txt" type="text" id="password2" placeholder="Confirm Password" />
       <input className="txt" type="text" id="email" placeholder="Email" />
       <input className="txt" type="text" id="first_name" placeholder="First Name" />
       <input className="txt" type="text" id="last_name" placeholder="Last Name" />
       <button onClick={consumir_register}> Ok</button>
      </header>
    </div>
    );
  }
  
  export default App;