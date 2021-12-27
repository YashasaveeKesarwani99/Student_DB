import React,{useEffect, useState} from 'react';
import firebase from 'firebase'
//components
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Form, Button } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import CreateStudentCourse from '../CreateStudentCourse/CreateStudentCourse'
import EditIcon from '@mui/icons-material/Edit';
import EditStudentTable from '../EditStudentCourse/EditStudentCourse';
//styles
import './StudentTable.css'


const StudentTable = (props)=>{

    const [show,setShow] = useState(false);
    const [data,setData] = useState({})
    const [editShow,setEditShow] = useState(false);
    const [arr,setArr] = useState([]);
    const [query,setQuery] = useState("")
    const [edit,setEdit]= useState(false)
   
    // listing students' list as soon as component loads
    useEffect(()=>{
        if(localStorage.getItem('uid'))
            props.setAuth(true)

        var ar = []
        firebase
        .database()
        .ref(`Students/` )
        .on('value', (snapshot)=>{
           Object.entries(snapshot.val()).forEach((log)=>{
            ar.push({...log})
           })
           setArr([])
           setArr(ar)
        })
    },[show,props])

    // function to revalidate list after it is updated
    const revalidate = ()=>{
        var ar = []
        firebase
        .database()
        .ref(`Students/` )
        .on('value', (snapshot)=>{
           Object.entries(snapshot.val()).forEach((log)=>{
            ar.push({...log})
           })
           setArr([])
           setArr(ar)
        })
    }

    // handling modal rendering
    const viewHandler = (e)=>{
        e.preventDefault();
        setShow(true)
    }
    
    // Handling pagination
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    

    // Handling logout functionality
      const logoutHandler = ()=>{
          localStorage.setItem('uid','')
          props.setAuth(false)
      }

    return(
        <div>
            <CreateStudentCourse 
            show={show}
            setShow={setShow}
            />
            <EditStudentTable
            editShow={editShow}
            setEditShow={setEditShow}
            data={data}
            revalidate={revalidate}
            edit={edit}
            setEdit={setEdit}
            />
            <div className='navbar'>
            <div className='sub-nav1'><AccountCircleRoundedIcon style={{marginRight:"0.5em",marginTop:'.1em'}}/>
            <h4>Admin</h4></div>
            <div onClick={()=>logoutHandler()}>
               <ExitToAppRoundedIcon/> 
            </div>
            </div>
            <div className='table'>
            <div className='sub-table'>
            <h5>Course Table</h5>
            <hr/>
            <div className='add-student'>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" className="search-input"
            onChange={(e)=>setQuery(e.target.value)}
             placeholder="search" />
            </Form.Group>
            </Form>
            <div>
            <Button variant='primary' onClick={(e)=>viewHandler(e)}>
                <div style={{display:'flex', height:'1.5em'}}>
                <AddIcon fontSize="small"/>
                <p>Add Student</p>
                </div>
            </Button>
            </div>
            </div>
            <div className='table-container'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer  sx={{ maxHeight: 440 }} style={{border:'1px grey solid'}}>
             <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow >
            <TableCell style={{fontWeight:"700"}}>Roll No.</TableCell>
            <TableCell style={{fontWeight:"700"}} align="right">Name</TableCell>
            <TableCell style={{fontWeight:"700"}} align="right">Course</TableCell>
            <TableCell style={{fontWeight:"700"}} align="right">Gender</TableCell>
            <TableCell style={{fontWeight:"700"}} align="right">Options</TableCell>
          </TableRow>
            </TableHead>
            <TableBody>
            {
            arr
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .filter((obj) =>
                JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())
            )
            .map((row,idx) => (
             <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[1].rollId}
              </TableCell>
              <TableCell align="right">{row[1].name}</TableCell>
              <TableCell align="right">{row[1].course}</TableCell>
              <TableCell align="right">{row[1].gender}</TableCell>
              <TableCell align="right" onClick={()=>{
                  setData(row[1])
                  setEditShow(true)
                  setEdit(true)
                  }} ><EditIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={arr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Paper>
            </div>
            </div>
            </div>
        </div>
    )

}

export default StudentTable;