import { Calendar, User, FolderOpen } from "lucide-react";

const statusConfig = {
    'To Do': { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    'In Progress': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
    'Done': { bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
};

const TaskCard = ({ task }) => {
    const status = statusConfig[task.status] || statusConfig['To Do'];

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                    {task.title}
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {task.status}
                </span>
            </div>

            {task.description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                {task.project && (
                    <span className="inline-flex items-center gap-1">
                        <FolderOpen size={12} />
                        {task.project}
                    </span>
                )}
                {task.assignee && (
                    <span className="inline-flex items-center gap-1">
                        <User size={12} />
                        {task.assignee}
                    </span>
                )}
                {task.due_date && (
                    <span className="ml-auto inline-flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(task.due_date).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TaskCard;