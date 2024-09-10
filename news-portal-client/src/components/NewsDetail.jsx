import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import request from '../utils/axios'

export default function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await request.get(`/pub/articles/${id}`);
                setNews(data);
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, [id])

    if (error) {
        return <h3 className="flex justify-center items-center h-[80vh] w-screen">{error.response.data.message}</h3>
    }
    return (
        <>
            <img className="w-full h-[80vh]" src={news.imgUrl} alt="" />
            <div className="w-full flex justify-center">
                <div className="mt-[-80px] bg-white w-[90%] rounded-md p-10 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <p className="text-gray-400 font-thin">{news.User?.username ? news.User.username : news.User?.email}</p>
                        <p className="text-gray-400 font-thin">{news.createdAt}</p>
                    </div>
                    <h1 className="text-5xl font-bold">{news.title}</h1>
                    <div>
                        <p>{news.content}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
