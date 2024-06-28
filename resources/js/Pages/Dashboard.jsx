import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function Dashboard({ auth, myPendingTasks, totalPendingTasks, inProgressTasks, myInProgressTasks, completedTasks, myCompletedTasks, activeTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-amber-500 text-xl font-semibold">Pending Tasks</h3>
                            <p>{myPendingTasks} / {totalPendingTasks}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-blue-500 text-xl font-semibold">In Progress Tasks</h3>
                            <p>{inProgressTasks} / {myInProgressTasks}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-green-500 text-xl font-semibold">Completed Tasks</h3>
                            <p>{completedTasks} / {myCompletedTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Project Name</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activeTasks.data.map((task) => (
                            <tr key={task.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{task.id}</td>
                                <td className="px-4 py-3 hover:underline">
                                    <Link href={route("project.show", task.project.id)}>
                                        {task.project.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 hover:underline">
                                    <Link href={route("task.show", task.id)}>
                                        {task.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="px-2 py-1 rounded text-nowrap text-white">
                                          <p className={"px-2 text-center py-1 rounded text-white w-24 " + TASK_STATUS_CLASS_MAP[task.status]}>
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                          </p>
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-nowrap">{task.due_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
