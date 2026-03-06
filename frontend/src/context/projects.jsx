import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import { isMockMode, MOCK_PROJECTS, mockNextId, MOCK_USER } from "../services/mockData";
import { UserContext } from "./user";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = async () => {
        if (!user) { setProjects([]); setLoading(false); return; }
        setLoading(true);
        try {
            if (isMockMode()) {
                setProjects([...MOCK_PROJECTS]);
                return;
            }
            const data = await apiFetch("projects/");
            setProjects(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { refetch(); }, [user]);

    const createProject = async ({ name, description = "" }) => {
        if (isMockMode()) {
            const newProject = {
                id: mockNextId(), name, description,
                owner: MOCK_USER, created_at: new Date().toISOString(), tasks: [],
            };
            MOCK_PROJECTS.push(newProject);
            setProjects((prev) => [...prev, newProject]);
            return newProject;
        }
        const data = await apiFetch("projects/", {
            method: "POST",
            body: JSON.stringify({ name, description }),
        });
        setProjects((prev) => [...prev, data]);
        return data;
    };

    const deleteProject = async (id) => {
        if (isMockMode()) {
            const idx = MOCK_PROJECTS.findIndex((p) => p.id === id);
            if (idx !== -1) MOCK_PROJECTS.splice(idx, 1);
            setProjects((prev) => prev.filter((p) => p.id !== id));
            return;
        }
        await apiFetch(`projects/${id}/`, { method: "DELETE" });
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProjectsContext.Provider value={{ projects, loading, error, createProject, deleteProject, refetch }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjectsContext = () => useContext(ProjectsContext);


// --- Tasks for a project ---

export const useProjectTasks = (projectId) => {
    const pid = projectId ? Number(projectId) : null;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        if (!pid) return;
        setLoading(true);
        try {
            if (isMockMode()) {
                const project = MOCK_PROJECTS.find((p) => p.id === pid);
                setTasks(project ? [...project.tasks] : []);
                return;
            }
            const data = await apiFetch(`projects/${pid}/tasks/`);
            setTasks(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, [pid]);

    const createTask = async ({ title, description = "", status = "todo", due_date = null }) => {
        if (isMockMode()) {
            const newTask = {
                id: mockNextId(), project: pid, title, description, status,
                assigned_to: null, due_date, created_at: new Date().toISOString(),
            };
            const project = MOCK_PROJECTS.find((p) => p.id === pid);
            if (project) project.tasks.push(newTask);
            setTasks((prev) => [...prev, newTask]);
            return newTask;
        }
        const data = await apiFetch("tasks/", {
            method: "POST",
            body: JSON.stringify({ title, description, status, due_date, project: pid }),
        });
        setTasks((prev) => [...prev, data]);
        return data;
    };

    const updateTask = async (id, changes) => {
        if (isMockMode()) {
            const project = MOCK_PROJECTS.find((p) => p.id === pid);
            if (project) {
                const t = project.tasks.find((t) => t.id === id);
                if (t) Object.assign(t, changes);
            }
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
            return;
        }
        const data = await apiFetch(`tasks/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(changes),
        });
        setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
        return data;
    };

    const deleteTask = async (id) => {
        if (isMockMode()) {
            const project = MOCK_PROJECTS.find((p) => p.id === pid);
            if (project) project.tasks = project.tasks.filter((t) => t.id !== id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            return;
        }
        await apiFetch(`tasks/${id}/`, { method: "DELETE" });
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetch };
};