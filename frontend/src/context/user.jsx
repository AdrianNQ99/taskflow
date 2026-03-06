import { createContext, useState } from "react";
import { apiFetch } from "../services/api";
import { MOCK_USER } from "../services/mockData";

export const UserContext = createContext({
    user: null,
    login: async () => {},
    loginDemo: () => {},
    logout: () => {},
    register: async () => {},
});

export const UserProvider = ({ children }) => {
    // Al recargar, recuperar el usuario del localStorage si existe
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const loginDemo = () => {
        localStorage.setItem('demo', 'true');
        localStorage.setItem('accessToken', 'demo-token');
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
        setUser(MOCK_USER);
    };

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
        localStorage.removeItem('demo');
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
        <UserContext.Provider value={{ user, login, loginDemo, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};
