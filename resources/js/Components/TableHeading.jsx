import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({ children, name, sortable = true, sort_field = null, sort_direction, sortChanged = () => {}}) {
    return (
        <th onClick={(e) => sortChanged(name)} className="px-4 py-3 cursor-pointer">
            <div className="flex items-center justify-between gap-1 text-nowrap">
                { children }
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={"w-4 " + (sort_field === name && sort_direction === 'asc' ? 'text-black' : 'text-gray-300')}/>
                        <ChevronDownIcon
                            className={"w-4 -mt-2 " + (sort_field === name && sort_direction === 'desc' ? 'text-black' : 'text-gray-300')}/>
                    </div>
                )}
            </div>
        </th>
    )
}
