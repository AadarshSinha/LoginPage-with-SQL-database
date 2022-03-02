import React,{useState} from 'react';
import axios from 'axios';
const Screen2 = () => {

    const defaulT="Enter the following details"
    const success="User added successfully"
    const emptyError="All fields are mandatory"
    const alphaError="Username should be alphaneumeric"
    const spaceError="Username should not have space"
    const mobileError="mobile number should be 10 digits"
    const emailError="email id entered is invalid"

    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [mobile,setMobile] = useState("")
    const [username,setUsername] = useState("")
    const [deluser,setDeluser] = useState("")
    const [getuser,setGetuser] = useState("")
    const [display,setDisplay] = useState(defaulT)


    const Validate = () => {
        var alphaNumeric = /[^0-9a-zA-Z]/;
        var space = username.replace(/\s/g, '');
        var emailTest =   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(username.length===0 || address.length===0){
             setDisplay(emptyError)
             return false
        }
        if(alphaNumeric.test(username)){
             setDisplay(alphaError)
             return false
        }
        if(space.length!==username.length){
             setDisplay(spaceError)
             return false
        }
        if(!emailTest.test(email)) {
            setDisplay(emailError)
            return false
        }
        if(mobile.length!==10) {
            setDisplay(mobileError)
            return false
        }
        return true;
    }
    const Add = () => {
        if(Validate())
        {
            axios.post("http://127.0.0.1:2000/add" , //127.0.0.1:2000 (localhost)
            {
                Email : email,
                Address : address,
                Mobile : mobile,
                Username : username
            }).then((res)=>{
                console.log(res)
                setDisplay(success)
            })
        }
    }
    const Delete = () => {
        axios.post("http://127.0.0.1:2000/delete" , //127.0.0.1:2000 (localhost)
        {
            delUser : deluser
        }).then((res)=>{
            console.log(res)
        })
    }
    const getData = () => {
        axios.get("http://127.0.0.1:2000/getdata")    // localhost = 127.0.0.1
        .then((res)=>{
            setGetuser(JSON.stringify(res.data))
            console.log(res)
        })
    }
    return(
        <>
          <div>
            <label>Username <br/> </label>
            <input type="text" onChange={(event)=>{setUsername(event.target.value)}}/><br/>
            <label>Mobile No. <br/> </label>
            <input type="text" onChange={(event)=>{setMobile(event.target.value)}}/><br/>
            <label>Email <br/> </label>
            <input type="text" onChange={(event)=>{setEmail(event.target.value)}}/><br/>
            <label>Address <br/> </label>
            <input type="text" onChange={(event)=>{setAddress(event.target.value)}}/><br/>
            <button onClick={Add}>ADD</button><br/>
            {display}<br/><br/>
            <label>Username to be deleted<br/> </label>
            <input type="text" onChange={(event)=>{setDeluser(event.target.value)}}/><br/>
            <button onClick={Delete}>DELETE</button><br/><br/><br/><br/>
            <button onClick={getData}>UPDATE DATA</button><br/><br/>
            {getuser}
        </div>
        </>
    )
}

export default Screen2;