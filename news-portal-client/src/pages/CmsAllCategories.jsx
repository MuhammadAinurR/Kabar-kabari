import { useEffect, useState } from "react";
import request from "../utils/axios";
import { Link } from "react-router-dom";

function CmsAllCategories() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = `/pub/categories`;
                const { data } = await request.get(endpoint);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    console.log(data)
    return (
        <>
            <div className="flex justify-center">
                <div className="w-3/5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 items-center text-center">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 items-center text-center">
                                        Articles
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b">
                                            <td className="px-6 py-4 text-center">
                                                {e.name}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link to={`/${e.name}`} className="font-medium text-blue-600 hover:underline">Articles List</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CmsAllCategories