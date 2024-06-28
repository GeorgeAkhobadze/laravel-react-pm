import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('user.index'), queryParams);
    }

    const deleteUser = (ev, user) => {
        if(!window.confirm('Are you sure you want to delete?')) {
            return;
        }
        router.delete(route('user.destroy', user.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users"/>

            {success && <div className="bg-emerald-500 px-4 text-white">{success}</div>}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                            <h3 className="text-xl font-semibold mb-4">User List</h3>
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                                    <tr>
                                        <TableHeading sortChanged={sortChanged} name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>
                                            ID
                                        </TableHeading>
                                        <TableHeading sortChanged={sortChanged} name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>
                                            Name
                                        </TableHeading>
                                        <TableHeading sortChanged={sortChanged} name="email" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>
                                            Status
                                        </TableHeading>
                                        <TableHeading sortChanged={sortChanged} name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>
                                            Create Date
                                        </TableHeading>
                                        <th className="px-4 py-3 text-center text-nowrap">Actions</th>
                                    </tr>
                                    </thead>
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                                    <tr>
                                        <th className="px-4 py-3"></th>
                                        <th className="px-4 py-3">
                                            <TextInput className="w-full" placeholder="User Name"
                                                       defaultValue={queryParams.name}
                                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                                       onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-4 py-3">
                                            <TextInput className="w-full" placeholder="User Email"
                                                       defaultValue={queryParams.email}
                                                       onBlur={e => searchFieldChanged('email', e.target.value)}
                                                       onKeyPress={e => onKeyPress('email', e)}
                                            />
                                        </th>
                                        <th className="px-4 py-3"></th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.data.map(user => (
                                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                            <th className="px-4 py-3">{user.id}</th>
                                            <th className="px-4 py-3 hover:underline text-nowrap">{user.name}</th>
                                            <td className="px-4 py-3 text-center">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3 text-nowrap">{user.created_at}</td>
                                            <td className="px-4 py-3 text-center">
                                                <Link href={route('user.edit', user.id)}
                                                      className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                                                <button onClick={(e) => deleteUser(e, user)}
                                                      className="font-medium text-red-600 hover:underline mx-1">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                <Pagination links={users.meta.links}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
