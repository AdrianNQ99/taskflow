import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.jsx";
import { useProjectsContext } from "../context/projects.jsx";
import { FolderOpen, ClipboardList, Plus, Trash2, X } from "lucide-react";
import Button from "../components/ui/Button";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const { projects, loading, createProject, deleteProject } = useProjectsContext();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [creating, setCreating] = useState(false);

    const allTasks = projects.flatMap((p) => p.tasks || []);
    const pendingTasks = allTasks.filter((t) => t.status !== "done");
    const doneTasks = allTasks.filter((t) => t.status === "done");

    const handleCreateProject = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        setCreating(true);
        try {
            await createProject({ name: newName.trim(), description: newDesc.trim() });
            setNewName("");
            setNewDesc("");
            setShowForm(false);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Hola, {user?.username || "usuario"} 👋
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Aquí tienes un resumen de tu actividad.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Proyectos", value: projects.length, icon: FolderOpen, color: "indigo" },
                    { label: "Tareas Pendientes", value: loading ? "—" : pendingTasks.length, icon: ClipboardList, color: "amber" },
                    { label: "Completadas", value: loading ? "—" : doneTasks.length, icon: ClipboardList, color: "emerald" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-6 flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}>
                            <Icon size={20} className={`text-${color}-600 dark:text-${color}-400`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Projects */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Proyectos</h2>
                        <button
                            onClick={() => setShowForm((v) => !v)}
                            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                        >
                            {showForm ? <X size={14} /> : <Plus size={14} />}
                            {showForm ? "Cancelar" : "Nuevo"}
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleCreateProject} className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 space-y-3">
                            <input
                                type="text" required placeholder="Nombre del proyecto"
                                value={newName} onChange={(e) => setNewName(e.target.value)}
                                className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <input
                                type="text" placeholder="Descripción (opcional)"
                                value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                                className="block w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <Button type="submit" size="sm" disabled={creating}>
                                {creating ? "Creando..." : "Crear proyecto"}
                            </Button>
                        </form>
                    )}

                    <div className="divide-y divide-slate-100 dark:divide-gray-700">
                        {loading ? (
                            <div className="px-6 py-8 text-center text-sm text-gray-400">Cargando...</div>
                        ) : projects.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <FolderOpen size={36} className="text-gray-300 dark:text-gray-600 mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">No hay proyectos aún.</p>
                            </div>
                        ) : (
                            projects.slice(0, 5).map((p) => (
                                <div key={p.id} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-colors group">
                                    <button
                                        onClick={() => navigate(`/project-board/${p.id}`)}
                                        className="flex items-center gap-3 text-left flex-1 min-w-0"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <FolderOpen size={14} className="text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">{(p.tasks || []).length} tareas</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => deleteProject(p.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                        title="Eliminar proyecto"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tareas Pendientes</h2>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-gray-700">
                        {loading ? (
                            <div className="px-6 py-8 text-center text-sm text-gray-400">Cargando...</div>
                        ) : pendingTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <ClipboardList size={36} className="text-gray-300 dark:text-gray-600 mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">No hay tareas pendientes.</p>
                            </div>
                        ) : (
                            pendingTasks.slice(0, 6).map((t) => (
                                <div key={t.id} className="flex items-center gap-3 px-6 py-3">
                                    <span className={`flex-shrink-0 w-2 h-2 rounded-full ${t.status === "doing" ? "bg-amber-500" : "bg-blue-500"}`} />
                                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{t.title}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;