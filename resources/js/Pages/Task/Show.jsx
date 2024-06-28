import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {TASK_PRIORITY_TEXT_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({ auth, task, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    {`Task "${task.name}"`}
                </h2>
            }
        >

            <Head title={`Task "${task.name}"`}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div className="flex flex-col gap-3">
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Task ID</label>
                                        <p>{task.id}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Task Name</label>
                                        <p>{task.name}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Task Name</label>
                                        <p>{TASK_STATUS_TEXT_MAP[task.status]}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Task Priority</label>
                                        <p>{TASK_PRIORITY_TEXT_MAP[task.priority]}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p>{task.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p>{task.due_date}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Creation Date</label>
                                        <p>{task.created_at}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Project</label>
                                        <p>
                                            <Link className={"hover:underline"} href={route('project.show', task.project.id)}>{task.project.name}</Link>
                                        </p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Assigned User </label>
                                        <p>{task.assignedUser.name}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p>{task.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Task Description</label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
