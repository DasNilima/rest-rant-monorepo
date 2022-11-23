import { useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="/sign-up" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="/login" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        )
    }
    //Hide admin buttons from non-admins
    let addPlaceButton = null

    if (currentUser?.role === 'admin') {
        addPlaceButton = (
            <li>
                <a href="/places/new" onClick={() => history.push("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="/" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="/places" onClick={() => history.push("/places")}>
                        Places
                    </a>
                </li>
                <li>
                    <a href="/places/new" onClick={() => history.push("/places/new")}>
                        Add Place
                    </a>
                </li>
                {addPlaceButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;



  



