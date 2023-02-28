import { useState, useEffect } from 'react';
import Scaledrone from 'scaledrone-react-redux';

function MyComponent(props) {
  const [member, setMember] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const drone = new Scaledrone("YOUR-CHANNEL-ID", {
      data: member
    });
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = {...member};
      updatedMember.id = drone.clientId;
      setMember(updatedMember);
    });
    const room = drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      setMessages(prevMessages => [...prevMessages, {member, text: data}]);
    });

    // cleanup function
    return () => {
      drone.destroy();
    };
  }, [member]);

  return (
    <div>
      {/* render component UI */}
    </div>
  );
}
