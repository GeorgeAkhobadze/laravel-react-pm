import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({ tasks, queryParams = null, hideProjectColumn = false, success }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams);
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

        router.get(route('task.index'), queryParams);
    }

    const deleteTask = (ev, task) => {
        if(!window.confirm('Are you sure you want to delete?')) {
            return;
        }
        router.delete(route('task.destroy', task.id))
    }

    return (
        <>
            {success && <div className="bg-emerald-500 px-4 text-white">{success}</div>}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                    <tr>
                        <TableHeading sortChanged={sortChanged} name="id" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction}>
                            ID
                        </TableHeading>
                        <th className="px-4 py-3">Image</th>
                        {!hideProjectColumn && <th className="px-4 py-3">Project Name</th>}
                        <TableHeading sortChanged={sortChanged} name="name" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction}>
                            Name
                        </TableHeading>
                        <TableHeading sortChanged={sortChanged} name="status" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction}>
                            Status
                        </TableHeading>
                        <TableHeading sortChanged={sortChanged} name="created_at" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction}>
                            Create Date
                        </TableHeading>
                        <TableHeading sortChanged={sortChanged} name="due_date" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction}>
                            Due Date
                        </TableHeading>
                        <th className="px-4 py-3 text-nowrap">Created By</th>
                        <th className="px-4 py-3 text-center text-nowrap">Actions</th>
                    </tr>
                    </thead>
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-300">
                    <tr>
                        <th className="px-4 py-3"></th>
                        <th className="px-4 py-3"></th>
                        {!hideProjectColumn && <th className="px-4 py-3"></th>}
                        <th className="px-4 py-3">
                            <TextInput className="w-full" placeholder="Task Name"
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
                    {tasks.data.map(task => (
                        <tr key={task.id} className="bg-white border-b hover:bg-gray-50">
                            <th className="px-4 py-3">{task.id}</th>
                            <td className="px-4 py-3">
                                <img src={task.image_path} alt={task.name}
                                     className="w-16 h-16 object-cover rounded"/>
                            </td>
                            {!hideProjectColumn && <td className="px-4 py-3">{task.project.name}</td>}
                            <td className="px-4 py-3">{task.name}</td>
                            <td className="px-4 py-3 text-center">
                                <p className={"px-2 text-center py-1 rounded text-white w-24 " + TASK_STATUS_CLASS_MAP[task.status]}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </p>
                            </td>
                            <td className="px-4 py-3 text-nowrap">{task.created_at}</td>
                            <td className="px-4 py-3 text-nowrap">{task.due_date}</td>
                            <td className="px-4 py-3">{task.createdBy.name}</td>
                            <td className="px-4 py-3 text-center">
                                <Link href={route('task.edit', task.id)}
                                      className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                                <button onClick={(e) => deleteTask(e, task)}
                                      className="font-medium text-red-600 hover:underline mx-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Pagination links={tasks.meta.links}/>
            </div>
        </>

    )
}
