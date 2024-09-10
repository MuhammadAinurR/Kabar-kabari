import { useEffect, useState } from "react";
import request from "../utils/axios";
import CmsTable from "../components/CmsTable";

function MyArticles() {

    const [data, setData] = useState([]);
    const [sort, setSort] = useState('DESC');
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCount, setDataCount] = useState(0);
    const totalPages = Math.ceil(dataCount / 10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = `/pub/articles?userFilter=${localStorage.getItem('userId')}&sort=${sort}&page=${currentPage}`;
                if (search) endpoint += `&search=${search}`
                const { data } = await request.get(endpoint);
                setData(data.rows);
                setDataCount(data.count)
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [search, currentPage, sort]);

    const switchSort = () => {
        if (sort === 'ASC') setSort('DESC')
        if (sort === 'DESC') setSort('ASC')
    }

    const handleDelete = async (id) => {
        try {
            await request.delete(`/articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData(prevData => prevData.filter(article => article.id !== id));
        } catch (error) {
            console.log('Error deleting article:', error);
        }
    };

    return (
        <>
            {data &&
                <CmsTable
                    name='My Articles'
                    search={search}
                    setSearch={setSearch}
                    switchSort={switchSort}
                    data={data}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    handleDelete={handleDelete}
                />
            }
        </>
    )
}

export default MyArticles;