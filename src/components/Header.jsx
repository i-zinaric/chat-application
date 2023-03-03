import logo2 from '../images/logo-2.svg';
import header from '../styles/header.scss';
import astronaut from '../images/avatar-1.svg';
import ninja from '../images/avatar-2.svg';
import mask from '../images/avatar-3.svg';

const Header = (props) => {

    const avatars = [
        {image: astronaut, nameId: 'astronaut'},
        {image: ninja, nameId: 'ninja'},
        {image: mask, nameId: 'mask'}
    ];

    const headerAvatars = props.headerAvatars;

    return (
        <div className='header'>
            <div className="logo-container">
                <img src={logo2} alt='logo'/>
                <h1>Glare</h1>
            </div>
            <div className="avatars-container">
               <img />
            </div>
        </div>
    )
}

export default Header