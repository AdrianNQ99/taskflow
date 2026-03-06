import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import Button from "./Button";

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [form, setForm] = useState({ title: "", description: "", status: "todo", due_date: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "todo",
                due_date: task.due_date ? task.due_date.slice(0, 10) : "",
            });
        }
    }, [task]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen || !task) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setSaving(true);
        try {
            await onSave(task.id, {
                title: form.title.trim(),
                description: form.description.trim(),
                status: form.status,
                due_date: form.due_date || null,
            });
            onClose();
        } finally {
            setSaving(false);
        }
    };

    const inputCls = "block w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Editar tarea</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título *</label>
                        <input
                            required type="text" value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Nombre de la tarea"
                            className={inputCls}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                        <textarea
                            rows={3} value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Descripción opcional"
                            className={`${inputCls} resize-none`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className={inputCls}
                            >
                                <option value="todo">Por Hacer</option>
                                <option value="doing">En Progreso</option>
                                <option value="done">Completado</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha límite</label>
                            <input
                                type="date" value={form.due_date}
                                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                                className={inputCls}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" size="sm" disabled={saving}>
                            <Save size={14} />
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
