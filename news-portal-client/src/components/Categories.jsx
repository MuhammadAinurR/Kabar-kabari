import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import request from '../utils/axios';

export default function Categories() {
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
        <div>
            <div className="flex gap-5 justify-center items-center">
                <NavLink
                    to='/'
                    className={({ isActive }) => isActive ? "text-xl text-gray-800 font-bold" : "text-gray-700"}
                >
                    News
                </NavLink>
                {data.map((e, i) =>
                    <NavLink
                        key={i}
                        to={`/${e.name}`}
                        className={({ isActive }) => isActive ? "text-xl text-gray-800 font-bold" : "text-gray-700"}
                    >
                        {e.name}
                    </NavLink>
                )}
                <NavLink
                    to='/categories'
                    className={({ isActive }) => isActive ? "text-xl text-gray-800 font-bold" : "text-gray-700"}
                >
                    All Categories
                </NavLink>

            </div>
            <hr className=" border" />

        </div>
    )
}