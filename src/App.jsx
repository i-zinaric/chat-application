import './App.css';
import './styles/styles.scss';
import Login from './components/Login';
import Input from './components/Input';
import Messages from './components/Messages';

import { useState, useEffect } from 'react';


function App() {

  const [showLogin, setShowLogin] = useState(true);

  const [member, setMember] = useState({userName: 'userName', avatar: 'avatarName'});
  const onSendMember = (userName, avatarName) => {
      setMember( {userName: userName, avatar: avatarName} );
      setShowLogin(false);
  }
  
  const [messages, setMessages] = useState([]);
  const onSendMessage = (textInputValue) => {  
      setMessages([...messages, {
        text: textInputValue,
        member: member
      }] )
      drone.publish({
        room: "observable-room",
        message: [messages]
      });
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
        const member = member;
        member.id = drone.clientId;
      });
      //connect to room
      const room = drone.subscribe('observable-room');
      room.on('data', (data, member) => {
        setMessages([...messages, {member, text: data}])
      })
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
