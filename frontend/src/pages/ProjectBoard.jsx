import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjectTasks } from "../context/projects.jsx";
import { useKanbanDrag } from "../services/hooks";
import TaskCard from "../components/ui/TaskCard";
import Button from "../components/ui/Button";
import EditTaskModal from "../components/ui/Modal";
import { KanbanSquare, Plus, ArrowLeft, X, Pencil } from "lucide-react";

const columns = [
    { id: "todo",  title: "Por Hacer",   color: "border-blue-500" },
    { id: "doing", title: "En Progreso", color: "border-amber-500" },
    { id: "done",  title: "Completado",  color: "border-emerald-500" },
];

const ProjectBoard = () => {
    const { id: projectId } = useParams();
    const { tasks, loading, createTask, updateTask, deleteTask } = useProjectTasks(projectId);
    const {
        draggedId, dragOverCol,
        tasksByStatus,
        handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd,
    } = useKanbanDrag(tasks, updateTask);

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", status: "todo", due_date: "" });
    const [creating, setCreating] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setCreating(true);
        try {
            await createTask({
                title: form.title.trim(),
                description: form.description.trim(),
                status: form.status,
                due_date: form.due_date || null,
            });
            setForm({ title: "", description: "", status: "todo", due_date: "" });
            setShowForm(false);
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link to="/" className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tablero del Proyecto</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Organiza y gestiona las tareas.</p>
                    </div>
                </div>
                <Button onClick={() => setShowForm((v) => !v)} variant={showForm ? "outline" : "primary"}>
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? "Cancelar" : "Nueva Tarea"}
                </Button>
            </div>

            {/* New task form */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título *</label>
                        <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Nombre de la tarea"
                            className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                        <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Descripción opcional"
                            className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="todo">Por Hacer</option>
                            <option value="doing">En Progreso</option>
                            <option value="done">Completado</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha límite</label>
                        <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                            className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                        <Button type="submit" size="sm" disabled={creating}>
                            {creating ? "Creando..." : "Crear Tarea"}
                        </Button>
                    </div>
                </form>
            )}

            {/* Kanban */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map((col) => {
                    const colTasks = tasksByStatus(col.id);
                    const isOver = dragOverCol === col.id;
                    return (
                        <div
                            key={col.id}
                            onDragOver={(e) => handleDragOver(e, col.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, col.id)}
                            className={`rounded-xl border-t-2 ${col.color} min-h-[60vh] flex flex-col transition-colors ${
                                isOver
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-400 ring-inset"
                                    : "bg-white dark:bg-gray-800/50 shadow-sm border border-slate-200 dark:border-transparent"
                            }`}
                        >
                            <div className="px-4 py-3 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{col.title}</h3>
                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
                                    {colTasks.length}
                                </span>
                            </div>

                            <div className="px-3 pb-3 flex-1 space-y-2">
                                {loading ? (
                                    <div className="text-xs text-center text-gray-400 py-6">Cargando...</div>
                                ) : colTasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <KanbanSquare size={28} className="text-gray-300 dark:text-gray-600 mb-2" />
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Sin tareas</p>
                                    </div>
                                ) : (
                                    colTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task.id)}
                                            onDragEnd={handleDragEnd}
                                            className={`relative group cursor-grab active:cursor-grabbing transition-opacity ${
                                                draggedId === task.id ? "opacity-40" : "opacity-100"
                                            }`}
                                        >
                                            <TaskCard task={task} />
                                            <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                                                <button
                                                    onClick={() => setEditingTask(task)}
                                                    className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                                                    title="Editar"
                                                >
                                                    <Pencil size={12} />
                                                </button>
                                                {col.id !== "doing" && col.id !== "done" && (
                                                    <button onClick={() => updateTask(task.id, { status: "doing" })}
                                                        className="px-2 py-0.5 text-xs rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors">
                                                        → Doing
                                                    </button>
                                                )}
                                                {col.id !== "done" && (
                                                    <button onClick={() => updateTask(task.id, { status: "done" })}
                                                        className="px-2 py-0.5 text-xs rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
                                                        ✓ Done
                                                    </button>
                                                )}
                                                <button onClick={() => deleteTask(task.id)}
                                                    className="px-2 py-0.5 text-xs rounded bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <EditTaskModal
            task={editingTask}
            isOpen={!!editingTask}
            onClose={() => setEditingTask(null)}
            onSave={updateTask}
        />
        </>
    );
};

export default ProjectBoard;