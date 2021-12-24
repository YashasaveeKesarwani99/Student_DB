import React,{useState,useEffect} from 'react'
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//dependencies
import firebase from 'firebase';
//components
import firebaseConfig from './utils/firebase';
import Login from './Components/Login/Login';
import StudentTable from './Components/StudentTable/StudentTable';

function App() {

  const [uid,setUid] = useState("")
  const [auth,setAuth] = useState(false)

  useEffect(()=>{
    setUid(localStorage.getItem("uid"))
    if(localStorage.getItem("uid"))
      setAuth(true)
  },[])
  
  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }else {
      firebase.app(); // if already initialized, use that one
   }
 
   if(auth)
   {
     return(
      <div className="App">
      <StudentTable setAuth={setAuth}/>
      </div>
     )
  }
  else if(!auth)
  return (
    <div className="App">
      <Login setAuth={setAuth}/>
    </div>
  );
}

export default App;
