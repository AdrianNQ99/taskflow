import { KanbanSquare, Plus } from "lucide-react";
import Button from "../components/ui/Button";

const columns = [
    { id: "todo", title: "Por Hacer", color: "border-blue-500" },
    { id: "in-progress", title: "En Progreso", color: "border-amber-500" },
    { id: "done", title: "Completado", color: "border-emerald-500" },
];

const ProjectBoard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Tablero del Proyecto
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Organiza y gestiona las tareas de tu proyecto.
                    </p>
                </div>
                <Button>
                    <Plus size={16} />
                    Nueva Tarea
                </Button>
            </div>

            {/* Kanban columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map((col) => (
                    <div key={col.id} className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl border-t-2 ${col.color} min-h-[60vh]`}>
                        <div className="px-4 py-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {col.title}
                            </h3>
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
                                0
                            </span>
                        </div>
                        <div className="px-3 pb-3 space-y-2">
                            {/* Empty state */}
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <KanbanSquare size={32} className="text-gray-300 dark:text-gray-600 mb-2" />
                                <p className="text-xs text-gray-400 dark:text-gray-500">Sin tareas</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectBoard;