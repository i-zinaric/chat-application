import { useState } from "react";
import styles from '../styles/input.scss';
import sendButton from '../images/send-button.svg';

const Input = (props) => {

    const [textInputValue, setTextInputValue] = useState('');
    const [avatarName, setAvatarName] = useState();
    
    const handleSendMessage = (event) => {
        event.preventDefault();
        props.onSendMessage(textInputValue, avatarName);
        
        const messagessDiv = document.querySelector('.messagess-container');
        messagessDiv.scrollTop = messagessDiv.scrollHeight + 1000;
        setTextInputValue('');
    }

    return (          
        <div className="form-container">
            <form onSubmit={handleSendMessage}>
                <input
                    type='text'
                    value={textInputValue}
                    onChange={(input) => setTextInputValue(input.target.value)}
                    placeholder='Start a new message'
                    autoFocus={true}
                />
                <button>
                    <img src={sendButton} alt="send-button" />
                </button>
            </form>
        </div>
    )

}

export default Input