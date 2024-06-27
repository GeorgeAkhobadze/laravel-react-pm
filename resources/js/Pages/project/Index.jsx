import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value)
    }

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
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3">
                                        <TextInput className="w-full" placeholder="Project Name"
                                                   defaultValue={queryParams.name}
                                                   onBlur={e => searchFieldChanged('name', e.target.value)}
                                                   onKeyPress={e => onKeyPress('name', e)}
                                        />
                                    </th>
                                    <th className="px-4 py-3">
                                        <SelectInput
                                            className="w-full"
                                            defaultValue={queryParams.status}
                                            onChange={e => searchFieldChanged('status', e.target.value)}>
                                            <option value=''>Select Status</option>
                                            <option value='pending'>Pending</option>
                                            <option value='in_progress'>In Progress</option>
                                            <option value='completed'>Completed</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3 text-center"></th>
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
                                        <td className="px-4 py-3 text-center">
                                                <p className={"px-2 text-center py-1 rounded text-white w-24 " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </p>
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
