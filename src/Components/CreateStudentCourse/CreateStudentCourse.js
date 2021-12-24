import React,{ useState } from 'react';
import firebase from 'firebase'
//components
import { Modal,Button,Form } from 'react-bootstrap';

const CreateStudentTable = (props) =>{

    //creating states
    const [name,setName] = useState("")
    const [rollId,setRollId] = useState("")
    const [course,setCourse] = useState("")
    const [gender,setGender] = useState("")


    //creating student profile
    const submitHandler = ()=>{
    firebase.database().ref(`/Students/`).child(rollId)
    .set({
        name,
        rollId,
        course,
        gender
    })
    .then((res)=>setTimeout(()=>{
        props.setShow(false)
    },500))
    .catch((error) => {
            console.log(error)
    });
    }

    return(
        <div>
            <Modal show={props.show} onHide={()=>props.setShow(false)} >
            <Modal.Header closeButton>
            <Modal.Title>Assign Student Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control as="select"
                onChange={(e)=>setCourse(e.target.value)} >
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
                <Form.Control type="text" placeholder="Roll No" onChange={(e)=>setRollId(e.target.value)}/>
            </Form.Group>
           <Form.Group>
               <Form.Label>Gender</Form.Label>
               <Form.Control as="select" placeholder="Gender" onChange={(e)=>setGender(e.target.value)}>
               <option value="">Choose Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               </Form.Control>
           </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={()=>submitHandler()}>
                Assign Course
            </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )

}

export default CreateStudentTable;