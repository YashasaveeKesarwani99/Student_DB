import React,{ useEffect, useState} from 'react';
import firebase from 'firebase'
//components
import { Modal,Button,Form } from 'react-bootstrap';
import LinearProgress from '@mui/material/LinearProgress';

const EditStudentTable = (props) =>{

    //creating states
    const [name,setName] = useState("")
    const [rollId,setRollId] = useState("")
    const [course,setCourse] = useState("")
    const [gender,setGender] = useState("")

    useEffect(()=>{
    if(props.data)
    {
    setName(props.data.name)
    setRollId(props.data.rollId)
    setCourse(props.data.course)
    setGender(props.data.gender)
    }
    },[props.data])


    //Editing student profile
    const submitHandler = ()=>{
    firebase.database().ref(`/Students/`).child(rollId)
    .update({
        name,
        rollId,
        course,
        gender
    })
    .then((res)=>{ console.log("update function")
    })
    .catch((error) => {
            console.log(error)
    });
    //refreshing the student list and vanishing modal
    props.revalidate()
    props.setEditShow(false)
    }

    //Deleting student profile
    const deleteHandler = (e)=>{
        e.preventDefault()

        let userRef = firebase.database().ref('/Students/').child(props.data.rollId);
        userRef.remove();
        props.revalidate();
        props.setEditShow(false)
    }   

  
    if(!props.data)
    {
        return(
            <div>
                <LinearProgress/>
            </div>
        )
    }

    else{
    return(
        <div>
            <Modal show={props.editShow} onHide={()=>{
                props.setEditShow(false)
                setName("")
                setCourse("")
                setGender("")
                setRollId("")
                }} >
            <Modal.Header closeButton>
            <Modal.Title>Edit Student Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} defaultValue={props.data.name}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control as="select" placeholder="Course"
                onChange={(e)=>setCourse(e.target.value)} defaultValue={props.data.course}>
                      <option value="">Choose Course</option>
                    <option value="Mathematics-1">Mathematics-1</option>
                    <option value="Mathematics-2">Mathematics-2</option>
                    <option value="Science">Science</option>
                    <option value="Economics-1">Economics-1</option>
                    <option value="Economics-2">Economics-2</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Roll No.</Form.Label>
                <Form.Control type="text" disabled={true} placeholder="Roll No" onChange={(e)=>setRollId(e.target.value)} defaultValue={props.data.rollId}/>
            </Form.Group>
           <Form.Group>
               <Form.Label>Gender</Form.Label>
               <Form.Control as="select" placeholder="Gender" onChange={(e)=>setGender(e.target.value)} defaultValue={props.data.gender}>
               <option value="">Choose Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               </Form.Control>
           </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={(e)=>submitHandler(e)}>
                Edit Info
            </Button>
            <Button variant="danger" onClick={(e)=>deleteHandler(e)}>
                Delete Row
            </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
            }
}

export default EditStudentTable;