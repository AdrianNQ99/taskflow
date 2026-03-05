import Dashboard from "../pages/Dashboard";
import ProjectBoard from "../pages/ProjectBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routerConfig = [
    {
        path: "/",
        component: < Dashboard />
    },
    {
        path: "/project-board",
        component: <ProjectBoard />
    },
    {
        path: "/login",
        component: <Login />    
    },
    {
        path: "/register",
        component: <Register />
    }

];

export default routerConfig;