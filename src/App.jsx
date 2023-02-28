import './App.css';
import './styles/styles.scss';
import Login from './components/Login';
import Input from './components/Input';
import Messages from './components/Messages';

import { useState, useEffect } from 'react';


function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [member, setMember] = useState({});
  const onSendMember = (userName, avatarName) => {
      setMember( {userName: userName, avatar: avatarName} );
      setShowLogin(false);
  }

  const [messages, setMessages] = useState([]);
  const onSendMessage = (text) => {
      setMessages([...messages, text])
    }
  

/*   //POKUŠAJ
  const Scaledrone = require('scaledrone-react-native');
  const drone = new Scaledrone('fkzKMvPIL1jCuyQR');
  // // useEffect(() => { }) //????
  //connect to scaledrone
  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');
  });
  //connect to room
  const room = drone.subscribe('observable-room');
  room.on('data', (message, member) => {
    setMessages([...messages, message])
  })
  //publish to room
  const onSendMessage = (text) => {
    setMessages([...messages, text]);
    drone.publish({
      room: "observable-room",
      message: messages,
    });
  } */

  const Scaledrone = require('scaledrone-react-native');

  useEffect(() => {
    const drone = new Scaledrone("fkzKMvPIL1jCuyQR", {
      data: member
    });
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = {...member};
      updatedMember.id = drone.clientId;
      setMember(updatedMember);
      console.log(member);
    });
    const room = drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      setMessages((prevMessages) => [...prevMessages, {member, text: data}]);
    });
    const onSendMessage = (text) => {
      setMessages([...messages, text]);
      drone.publish({
        room: "observable-room",
        message: messages,
      });}
  }, [member]);
 

  return (
    <div className="App">  

      {
        (showLogin) ?
        
        <Login
         onSendMember={onSendMember}
        /> :

        <div className='container'>         
          <Messages 
            messages={messages}
            member={member}
          />            

          <Input
            onSendMessage={onSendMessage}
          />
        </div>
      }
      

    </div>
  )

}

export default App;
