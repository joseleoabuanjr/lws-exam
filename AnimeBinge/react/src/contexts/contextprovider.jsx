import { useContext, useState, createContext } from "react";

// Create a new context with initial values for user, token, setUser, and setToken
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

// ContextProvider component to manage global state
export const ContextProvider = ({ children }) => {
    // Define user and setUser state using React's useState hook
    const [user, setUser] = useState({});
    
    // Define token and _setToken state using React's useState hook
    // Get initial token value from local storage
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    // Function to set token and update local storage
    const setToken = (token) => {
        _setToken(token); // Set token state
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token); // Update local storage with new token
        } else {
            localStorage.removeItem('ACCESS_TOKEN'); // Remove token from local storage if null
        }
    }

    // Provide the state values and setter functions to child components
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children} {/* Render child components */}
        </StateContext.Provider>
    )
}

// Custom hook to access the context values
export const useStateContext = () => useContext(StateContext);
