import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = async () => {
        setLoading(true);
        try {
            const data = await apiFetch("projects/");
            setProjects(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { refetch(); }, []);

    const createProject = async ({ name, description = "" }) => {
        const data = await apiFetch("projects/", {
            method: "POST",
            body: JSON.stringify({ name, description }),
        });
        setProjects((prev) => [...prev, data]);
        return data;
    };

    const deleteProject = async (id) => {
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
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        if (!projectId) return;
        setLoading(true);
        try {
            const data = await apiFetch(`projects/${projectId}/tasks/`);
            setTasks(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, [projectId]);

    const createTask = async ({ title, description = "", status = "todo", due_date = null }) => {
        const data = await apiFetch("tasks/", {
            method: "POST",
            body: JSON.stringify({ title, description, status, due_date, project: projectId }),
        });
        setTasks((prev) => [...prev, data]);
        return data;
    };

    const updateTask = async (id, changes) => {
        const data = await apiFetch(`tasks/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(changes),
        });
        setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
        return data;
    };

    const deleteTask = async (id) => {
        await apiFetch(`tasks/${id}/`, { method: "DELETE" });
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetch };
};