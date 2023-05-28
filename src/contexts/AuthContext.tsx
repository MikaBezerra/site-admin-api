import React, { createContext, useContext, useEffect, useState } from "react";

import { User } from "../services/authServices";

interface AuthContextProps {
    authenticated: boolean;
    user: User;
    login: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({} as User);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
            setUser(JSON.parse(storeUser));
            setAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (loggedInUser: User) => {
        setUser(loggedInUser);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    };

    const logout = () => {
        setUser({} as User);
        setAuthenticated(false);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );

}