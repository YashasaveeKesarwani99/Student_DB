import firebase from 'firebase'
import React,{useState} from 'react';
//styles
import { Button, Form } from 'react-bootstrap'
import './Login.css'

const Login = (props)=>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const submitHandler = (e) =>{
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user)=>{
            console.log(user)
            console.log(user.uid)
            localStorage.setItem('uid',user.uid)
            props.setAuth(true)
        })
        .catch((err)=>alert(err.message))
    }

    return(
        <div className='container'>
            <Form className='main'>
            <h3>Sign in</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
             <Button variant="primary" type="submit" onClick={(e)=>submitHandler(e)}>
             Submit
              </Button>
            </Form>
            </div>
    )
}

export default Login;