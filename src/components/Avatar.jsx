import '../styles/avatar.scss';
import { useState } from 'react';

const Avatar = ({avatarItem, onSendAvatar}) => {

    const [avatarCheckedId, setAvatarCheckedId] = useState();
    const handleAvatarChange = (avatar) => {
        setAvatarCheckedId(avatar.target.id);
    }
    
    return (
        
        <div className='avatar-item'>
            <input
                type='radio'
                id={avatarItem.nameId}
                name='avatar'
                onClick={handleAvatarChange}
            />
            <label htmlFor={avatarItem.nameId}>
                <img src={avatarItem.image} alt={avatarItem.nameId} />
            </label>
        </div>
        
    )
}

export default Avatar;