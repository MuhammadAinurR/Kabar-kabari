import { useEffect, useState } from "react";
import request from "../utils/axios";
import { Link } from "react-router-dom";

const AllCategories = () => {
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

    return (
        <div className="flex justify-center">
            <div className="w-3/5">
                <div className="grid grid-cols-2 items-center gap-5 my-5">

                    {data.map((e, i) => {
                        return (
                            <Link key={i} to={`/${e.name}`}>
                                <div className="flex justify-center items-center bg-gray-600 hover:bg-gray-800 p-5 rounded-md text-white text-4xl">
                                    <button>{e.name}</button>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllCategories