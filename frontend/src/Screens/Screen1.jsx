import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Screen1 = () => {
    const nav = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [popup,setPopup] = useState(false)
    const Login = () => {
        axios.post("http://127.0.0.1:2000/login" , //127.0.0.1:2000 (localhost)
        {
            Email : email,
            Password : password
        }).then((res)=>{
            console.log(res)
            if(res.data.auth){
                console.log(res.data.token)
                localStorage.setItem("token",res.data.token)
                nav('/screen2')
            }
            else setPopup(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
            <label>Email <br/> </label>
            <input type="text" onChange={(event)=>{setEmail(event.target.value)}}/>
            <br/>
            <label>Password <br/> </label>
            <input type="password" onChange={(event)=>{setPassword(event.target.value)}}/>
            <br/>
            <button onClick={Login}>LOGIN</button>
            {popup?<h3>Wrong username or password</h3>:""}
        </div>
    )
}

export default Screen1;