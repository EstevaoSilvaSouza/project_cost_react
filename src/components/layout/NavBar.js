import { Link } from 'react-router-dom'

import Container from './Container'

import Styles from './NavBar.module.css'
import Logo from '../../img/costs_logo.png'

function NavBar() {
    return (
        <nav className={Styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={Logo} alt="img"></img>
                </Link>
                <ul className={Styles.list}>
                    <li className={Styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/contact">Contact</Link>
                    </li>

                    <li className={Styles.item}>
                        <Link to="/newproject">NewProject</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default NavBar