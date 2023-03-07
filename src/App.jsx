import './App.css';
import './styles/styles.scss';
import Login from './components/Login';
import Input from './components/Input';
import Messages from './components/Messages';
import Header from './components/Header';
import { useState, useEffect } from 'react';

function App() {
  const onSendMember = (userName, avatarIndex) => {
    setMember( {userName: userName, avatarIndex: avatarIndex} );
    setShowLogin(false);
  }

  const [showLogin, setShowLogin] = useState(true);
  const [member, setMember] = useState( {userName: '', avatar: ''} );
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const [headerAvatars, setHeaderAvatars] = useState([]);

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  
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
        setMessages( [...messages, {member, text: data, time: `${hours}:${minutes}`}] );

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
          <Header
            headerAvatars={headerAvatars}
          />
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
