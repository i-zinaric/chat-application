import './App.css';
import './styles/styles.scss';
import Login from './components/Login';
import Input from './components/Input';
import Messages from './components/Messages';

import { useState, useEffect } from 'react';


function App() {

  const onSendMember = (userName, avatarIndex) => {
    setMember( {userName: userName, avatarName: avatarIndex} );
    setShowLogin(false);
  }


  const [showLogin, setShowLogin] = useState(true);
  const [member, setMember] = useState( {userName: '', avatar: ''} );
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  

  useEffect(() => {
    if (member.userName !== '') {
      const drone = new window.Scaledrone('fkzKMvPIL1jCuyQR', {
        data: member
      });
      setDrone(drone);
      console.log('connect to scaledrone')
    }
  }, [member]);


  useEffect(() => {
    if (drone) {
      
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        member.id = drone.clientId;
        setMember(member);
        console.log('prijavljeni user: ', member);
      });

      const room = drone.subscribe("observable-room");

      room.on('data', (data, member) => {
        setMessages( [...messages, {member, text: data}] );
      })

    }
  }, [drone, member, messages]);

  const onSendMessage = (textInputValue) => {
      drone.publish({
        room: "observable-room",
        message: textInputValue
      });
    }
 

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
