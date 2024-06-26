import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-xl font-semibold mb-4">Project List</h3>
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Create Date</th>
                                    <th className="px-4 py-3">Due Date</th>
                                    <th className="px-4 py-3">Created By</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.data.map(project => (
                                    <tr key={project.id} className="bg-white border-b hover:bg-gray-50">
                                        <th className="px-4 py-3">{project.id}</th>
                                        <td className="px-4 py-3">
                                            <img src={project.image_path} alt={project.name} className="w-16 h-16 object-cover rounded"/>
                                        </td>
                                        <td className="px-4 py-3">{project.name}</td>
                                        <td className="px-4 py-3">
                                                <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                        </td>
                                        <td className="px-4 py-3 text-nowrap">{project.created_at}</td>
                                        <td className="px-4 py-3 text-nowrap">{project.due_date}</td>
                                        <td className="px-4 py-3">{project.createdBy.name}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                                            <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 hover:underline mx-1">Delete</Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
