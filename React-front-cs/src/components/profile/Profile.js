import axios from "axios";
import "./Profile.css";

function Profile() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user_id');
    let image_profile = "";
    let usernameR, first_nameR, last_nameR, emailR;

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/profile/myprofile", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
                console.log(response.data);
                image_profile = "http://localhost:8000" + response.data.url_img;
                console.log(image_profile);
                document.getElementById('preview').src = image_profile;
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
                if (error.response.data === "Metodo post no permitido") {
                    console.log("Error");
                    put_image();
                }
            })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/profile/detailprofile/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        });
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/profile/detailprofile/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            console.log(response.data);
            alert("image deleted");
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            document.getElementById('preview').url = image_profile;
            window.location.reload();
        });
    }

    window.onload = function visualize_data() {
        axios.get("http://localhost:8000/api/v1/profile/detailprofile/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
                console.log(response.data);
                if(response.data.url_img != null){
                    image_profile = "http://localhost:8000" + response.data.url_img;
                    document.getElementById('preview').src = image_profile;
                }else{
                    document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            });

        axios.get("http://localhost:8000/api/v1/profile/profiledata/"+user+"/",{
            headers:{
                'Authorization': 'Token ' + token,
            },
        }).then((response) =>{
            usernameR = response.data.username;
            first_nameR = response.data.first_name;
            last_nameR = response.data.last_name;
            emailR = response.data.email;
            document.getElementById("firstName").placeholder = first_nameR;
            document.getElementById("lastName").placeholder = last_nameR;
            document.getElementById("email").placeholder = emailR;
            document.getElementById("username").placeholder = usernameR;
        }).catch((error)=>{
            console.log(error.response.data);
        })
    }

    let change_profile = () =>{
        let putData = new FormData();
        let usernameN = document.getElementById("username").value;
        let lastNameN = document.getElementById("lastName").value;
        let firstNameN = document.getElementById("firstName").value;
        let emailN = document.getElementById("email").value;

        if(usernameN === ""){
            usernameN = usernameR; 
        }
        if(lastNameN === ""){
            lastNameN = last_nameR;
        }
        if(firstNameN === ""){
            firstNameN = first_nameR;
        }
        if(emailN === ""){
            emailN = emailR;
        }
        putData.append("first_name",firstNameN);
        putData.append("last_name",lastNameN);
        putData.append("username",usernameN);
        putData.append("email",emailN);

        axios.put("http://localhost:8000/api/v1/profile/profiledata/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
            console.log(error.response.data);
        })
    }

    

    const cerrar_sesion = () => {
        localStorage.clear();
        let putData = new FormData();
        axios.put("http://localhost:8000/api/v1/profile/profiledata/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No hay sesión iniciada");
            console.log(error.response.data);
        })
        window.location="/";
    }

    return (
        <div className= "body" >
            <div className="container">
                <div className="welcome">
                       <h5>Bienvenido user {user }</h5>
                </div>
                
                <div className="Profile_profileImg">
                    <div className="Profile_bordeImg"></div>
                    <img alt="error img" id="preview" />
                </div>
                <div className="Profile_image">
                    <input accept="image/*" type="file" id="img"></input>
                </div>
                <div className="Profile_img">
                    <p/>
                    <button onClick={change_image}>Cambiar imagen</button> <br/>
                    <button onClick={delete_image}>Borrar la imagen</button>
                </div>
                <div className="div-Info">
                    <div className="div-datas">
                        <b>First name:</b><input id="firstName"></input>
                    </div>
                    <div className="div-datas">
                        <b>Last name:</b><input id="lastName"></input>
                    </div>
                    <div className="div-datas">
                        <b>User: </b><input id="username"></input>
                    </div>
                    <div className="div-datas">
                        <b>Correo: </b><input id="email"></input>
                    </div>
                </div>
                <div className="div-updt" onClick={change_profile}>
                    <button>Actualizar perfil</button>
                </div>
                <div className="div-logout">
                    <button className="button-logout" onClick={cerrar_sesion}>Cerrar sesión</button>
                </div>
                
                
            </div>
           
        </div>
    )
}

export default Profile;