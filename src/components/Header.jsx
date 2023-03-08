import logo2 from '../images/logo-2.svg';
import header from '../styles/header.scss';

const Header = (props) => {

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