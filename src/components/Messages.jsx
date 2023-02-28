import styles from '../styles/messages.scss';
import astronaut from '../images/avatar-1.svg';
import ninja from '../images/avatar-2.svg';
import mask from '../images/avatar-3.svg';

const Messages = (props) => {


    
    /* const {messages} = props; */
    const messages = props.messages;
    const member = props.member;
    const memberAvatar = props.member.avatar;
    
    return (
        <div className="messagess-container">
            {
                messages.map((message, index) => {
                    return (
                        <div className="message-item" key={index}>
                            
                            <div className="message-info">
                                <div className='user'>
                                    {member.userName}
                                </div>
                                <div className="time">
                                    12:23
                                </div>
                                <div className="message">                                    
                                    {message}
                                </div>
                            </div>
        
                            <div className="message-avatar">
                                <img src='' alt={member.avatar}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}


export default Messages