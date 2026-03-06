import { createContext, useState } from "react";
import { apiFetch } from "../services/api";

export const UserContext = createContext({
    user: null,
    login: async () => {},
    logout: () => {},
    register: async () => {},
});

export const UserProvider = ({ children }) => {
    // Al recargar, recuperar el usuario del localStorage si existe
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (userData) => {
        const data = await apiFetch('token/', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        // Obtener datos del perfil del usuario
        const profile = await apiFetch('profile/');
        localStorage.setItem('user', JSON.stringify(profile));
        setUser(profile);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (userData) => {
        await apiFetch('register/', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        // Auto-login tras registro
        await login({ username: userData.username, password: userData.password });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};
