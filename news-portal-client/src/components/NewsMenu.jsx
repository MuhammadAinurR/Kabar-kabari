import { useEffect, useState } from "react";
import { formatCurrentDate, formatRelativeTime } from "../utils/relativeTime";
import { Link, useLocation, useParams } from "react-router-dom";
import request from "../utils/axios";
import PaginationControls from "./PaginationControls";
import ArticleCard from "./ArticleCard";
import SortButton from "./SortButton";

export default function NewsMenu() {
    const [data, setData] = useState({ rows: [], count: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('DESC');
    const [error, setError] = useState('');
    const { category } = useParams();
    const { search } = useLocation();

    const totalPages = Math.ceil(data.count / 10);

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = `/pub/articles?page=${currentPage}&sort=${sort}`;
                if (category) endpoint += `&filter=${category}`;
                if (search) endpoint += `&search=${search.split('=')[1]}`;

                const { data } = await request.get(endpoint);
                setData({
                    rows: data.rows,
                    count: data.count
                });
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [category, search, currentPage, sort]);

    if (error) {
        return (
            <h3 className="flex justify-center items-center h-[80vh] w-screen">
                {error.response?.data?.message ?? 'An error occurred'}
            </h3>
        );
    }

    const switchSort = () => setSort(prevSort => (prevSort === 'ASC' ? 'DESC' : 'ASC'));

    if (data.count === 0) return <p className="text-center">No Data</p>;

    const [mainNews, ...restNews] = data.rows;

    return (
        <div className="flex flex-col gap-4 mb-5">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl text-gray-800">{formatCurrentDate()}</h1>
                <SortButton switchSort={switchSort}/>
            </div>

            {mainNews && (
                <Link to={`/n/${mainNews.id}`} className="grid grid-cols-1 md:grid-cols-2 py-4">
                    <div className="pr-3">
                        <div className="flex justify-between">
                            <p className="font-thin text-gray-500">
                                {mainNews.User?.username ?? mainNews.User?.email}
                            </p>
                            <p className="font-thin text-gray-500">
                                {formatRelativeTime(mainNews.createdAt)}
                            </p>
                        </div>
                        <p className="font-extrabold text-5xl">{mainNews.title}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={mainNews.imgUrl}
                            className="hover:scale-125 ease-in duration-200 rounded-xl object-cover h-full w-full border"
                            alt="News Image"
                        />
                    </div>
                </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {restNews.map((newsItem, i) => (
                    <div key={i}>
                        {newsItem && <ArticleCard newsItem={newsItem} formatRelativeTime={formatCurrentDate} Link={Link} />}
                    </div>
                ))}
            </div>

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}