
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/relativeTime";
import PaginationControls from "../components/PaginationControls";
import { useEffect } from "react";
import SortButton from "./SortButton";

function CmsTable({ name, search, setSearch, switchSort, data, currentPage, totalPages, setCurrentPage, handleDelete }) {
    useEffect(() => {
        setCurrentPage(1)
    }, [search])
    return (
        <>
            <div className="flex justify-center mt-5">
                <div className="w-[90%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl text-gray-800">{name}</h1>
                        <div className="flex">
                            <input
                                name='search'
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="default-search"
                                className="me-2 block ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                placeholder="Nuclear Bomb ..."
                                required
                            />
                            <div>
                                <SortButton switchSort={switchSort}/>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    {name === 'All Articles' &&
                                        <th scope="col" className="px-6 py-3">
                                            Author
                                        </th>
                                    }
                                    <th scope="col" className="px-6 py-3">
                                        Posted At
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {e.title}
                                            </th>
                                            {name === 'All Articles' &&
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {e.User.username ? e.User.username : e.User.email}
                                                </th>
                                            }
                                            <td className="px-6 py-4">
                                                {formatRelativeTime(e.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 flex gap-2 justify-center">
                                                <Link to={`/cms/${e.id}/edit`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                                |
                                                <Link to={`/cms/${e.id}/img`} className="font-medium text-gray-600 hover:underline">Change Image</Link>
                                                |
                                                <Link onClick={() => handleDelete(e.id)} className="font-medium text-red-600 hover:underline">Remove</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </>
    )
}

export default CmsTable