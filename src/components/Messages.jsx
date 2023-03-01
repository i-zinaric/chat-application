import styles from '../styles/messages.scss';
import astronaut from '../images/avatar-1.svg';
import ninja from '../images/avatar-2.svg';
import mask from '../images/avatar-3.svg';

const Messages = (props) => {


    
    /* const {messages} = props; */
    const messages = props.messages;
    const member = props.member;

    
    return (
        <div className="messagess-container">

            {
                (messages.length > 0) &&
                messages.map((el, index) => {
                    console.log(el)
                    return (
                        <div
                            className=
                                    {
                                        ((member.id === messages[index].member.id)) ?
                                        'message-item' :
                                        'message-item-received'
                                    }
                            key={index}>   {/* message-item */}
                            
                            <div className="message-info">
                                <div className='user'>
                                    {el.member.clientData.userName}
                                </div>
                                <div className="time">
                                    12:23
                                </div>
                                <div className="message">                                    
                                    {el.text}
                                </div>
                            </div>
        
                            <div className="message-avatar">
                                <img 
                                    src=''
                                    alt={el.member.clientData.avatarName}
                                />
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    )

}


export default Messages