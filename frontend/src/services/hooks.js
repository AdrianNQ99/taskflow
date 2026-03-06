import { useState, useEffect } from "react";
import { apiFetch } from "./api";

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;

// --- Kanban drag & drop ---

export const useKanbanDrag = (tasks, updateTask) => {
    const [draggedId, setDraggedId] = useState(null);
    const [dragOverCol, setDragOverCol] = useState(null);

    const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

    const handleDragStart = (e, taskId) => {
        setDraggedId(taskId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e, colId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverCol(colId);
    };

    const handleDrop = async (e, colId) => {
        e.preventDefault();
        setDragOverCol(null);
        if (draggedId === null) return;
        const task = tasks.find((t) => t.id === draggedId);
        if (task && task.status !== colId) {
            await updateTask(draggedId, { status: colId });
        }
        setDraggedId(null);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverCol(null);
    };

    return {
        draggedId,
        dragOverCol,
        tasksByStatus,
        handleDragStart,
        handleDragOver,
        handleDragLeave: () => setDragOverCol(null),
        handleDrop,
        handleDragEnd,
    };
};
