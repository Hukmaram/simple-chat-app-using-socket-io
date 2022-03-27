import './App.css';
import {useEffect, useState} from "react"
import io from "socket.io-client"
const socket=io.connect("http://localhost:4000")
function App() {
  const [state,setState]=useState({message:"",name:""})
  const [chat,setChat]=useState([])
  useEffect(()=>{
    socket.on("message",({name,message})=>{
      setChat([...chat,{name,message}])
    })
  })
  const onTextChange=e=>{
    setState({...state,[e.target.name]:e.target.value})
  }

  const onMessageSubmit=(e)=>{
    e.preventDefault()
    const {name,message}=state
    socket.emit('message',{name,message})
    setState({message:'',name})
  }
  const renderChat=()=>{
     return chat.map(({name,message},index)=>(
      <div key={index}>
        <h3>{name} : <span>{message}</span></h3>
      </div>
    ))
  }
  return (
    <div className="App">
      <form onSubmit={onMessageSubmit}>
        <h1>simple chat application</h1>
        <input name="name" onChange={e=>onTextChange(e)} value={state.name} placeholder="name"/>
        <input name="message" onChange={e=>onTextChange(e)} value={state.message} placeholder="message"/>
        <button>Send Message</button>
      </form>
      <h1>Chat Logs</h1>
      {renderChat()}
    </div>
  );
}

export default App;
