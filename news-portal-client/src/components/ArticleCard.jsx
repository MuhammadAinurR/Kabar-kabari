function ArticleCard({ newsItem, formatRelativeTime, Link }) {
    return (
        <Link
            key={newsItem.id}
            className="hover:cursor-pointer bg-white rounded-md ease-in duration-200"
            to={`/n/${newsItem.id}`}
        >
            <div className="overflow-hidden">
                <img className="hover:scale-110 ease-in duration-200 rounded-md border h-[250px] w-full" src={newsItem.imgUrl} alt="" />
            </div>
            <div className="flex justify-between">
                <p className="font-thin text-gray-500">
                    {newsItem.User?.username ?? newsItem.User?.email}
                </p>
                <p className="font-thin text-gray-500">
                    {formatRelativeTime(newsItem.createdAt)}
                </p>
            </div>
            <p className="font-bold text-gray-700">{newsItem.title}</p>
        </Link>
    )
}

export default ArticleCard