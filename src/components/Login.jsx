import '../styles/login.scss';
import logo from '../images/logo.svg';

import astronaut from '../images/avatar-1.svg';
import ninja from '../images/avatar-2.svg';
import mask from '../images/avatar-3.svg';

import { useState } from "react";


const Login = (props) => {

    const avatars = [
        {image: astronaut, nameId: 'astronaut'},
        {image: ninja, nameId: 'ninja'},
        {image: mask, nameId: 'mask'}
    ];

    const [userName, setUserName] = useState('');
    const [avatarName, setAvatarName] = useState();

    const handleSubmitName = (event) => {
        event.preventDefault();
        props.onSendMember(userName, avatarName);
        setUserName('');
    }

    return (
        <>
        
            <div id='header'>
                <img src={logo} alt='logo'/>
                <h1>Glare</h1>
            </div>

            <h4>First type your chat name and pick an avatar</h4>
            <p>Choose one from existing avatars</p>

            <form
                id='login-form'
                onSubmit={handleSubmitName}
            >
                <input
                    type='text'
                    maxLength={30}
                    value={userName}
                    placeholder='Your chat name'
                    required
                    autoFocus
                    onChange={(name) => {setUserName(name.target.value)}}
                />
                
                <div className='avatars-container'>
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div className='avatar-item' key={index}>
                                    <input
                                        type='radio'
                                        id={avatar.nameId}
                                        name='avatar'
                                        required
                                        onClick={(avatar) => setAvatarName(avatar.target.id)}
                                    />
                                    <label htmlFor={avatar.nameId}>
                                        <img src={avatar.image} alt={avatar.nameId} />
                                    </label>
                                </div>
                            )                      
                        })
                    }
                </div>
                
                <button type='submit'>
                    OK
                </button>
            </form>

        </>
    )
}

export default Login