const TaskCard = ({ task }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 mb-4 transition-colors">   
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{task.title}</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">Created at: {new Date(task.created_at).toLocaleDateString()}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Project: {task.project}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to: {task.assignee}</span>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{task.description}</p>
        <div className="mt-4 flex items-center justify-between">
            <span className={`px-2 py-1 text-sm rounded transition-colors ${
                task.status === 'To Do' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 
                task.status === 'In Progress' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            }`}>
                {task.status}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(task.due_date).toLocaleDateString()}</span>
        </div>
    </div>
  )
}
export default TaskCard;