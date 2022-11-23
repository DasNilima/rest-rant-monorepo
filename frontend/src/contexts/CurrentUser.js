import { createContext, useState, useEffect} from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
       //Fetch the current user on page load
       const getLoggedInUser = async () => {
        let response = await fetch('http://localhost:5002/authentication/profile', {
            // Include the JWT in fetch requests
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        let user = await response.json()
        setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])
    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider

