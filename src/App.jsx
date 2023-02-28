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
      setMessages(...messages, {
        text: text,
        member: member
      } )
    }
  

  const [drone, setDrone] = useState();
  useEffect(() => {
    const drone = new window.Scaledrone('fkzKMvPIL1jCuyQR', {
      data: member
    });
    setDrone(drone);
  }, []);


  useEffect(() => {
    if (drone) {
      //connect to scaledrone
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        member.id = drone.clientId;
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
  }
    }
  }, [drone])

 

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
