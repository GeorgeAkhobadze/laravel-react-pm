import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {USER_STATUS_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({ auth, user, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    {`User "${user.name}"`}
                </h2>
            }
        >

            <Head title={`User "${user.name}"`}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={user.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div className="flex flex-col gap-3">
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">User ID</label>
                                        <p>{user.id}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">User Name</label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">User Name</label>
                                        <p>{USER_STATUS_TEXT_MAP[user.status]}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p>{user.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p>{user.due_date}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Creation Date</label>
                                        <p>{user.created_at}</p>
                                    </div>
                                    <div className="flex-1 items-center">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p>{user.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">User Description</label>
                                <p className="mt-1">{user.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                                <TasksTable tasks={tasks} queryParams={queryParams} hideUserColumn={true}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
