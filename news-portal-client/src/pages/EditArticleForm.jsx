import { useEffect, useState } from "react";
import request from "../utils/axios";
import showToast from "../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

function EditArticleForm() {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        title: '',
        content: '',
        imgUrl: '',
        categoryId: ''
    });
    const articleId = useParams().id;
    const nav = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = `/pub/categories`;
                const { data } = await request.get(endpoint);
                setCategories(data);

                let articleEndPoint = `/pub/articles/${articleId}`;
                const { data: article } = await request.get(articleEndPoint);
                setData({
                    title: article.title,
                    content: article.content,
                    imgUrl: article.imgUrl,
                    categoryId: article.categoryId
                })
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [articleId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const endpoint = `/articles/${articleId}`;
            await request.put(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            showToast({ message: 'Success Edit Article', type: 'success' });
            nav('/cms/my-articles')
        } catch (error) {
            console.log('Error adding article:', error);
            error.response.data.message.forEach(e => showToast({ message: e }))
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="w-screen h-[80vh] flex justify-center items-center">
            <ArticleForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data={data}
                categories={categories}
            />
        </div>
    )
}

export default EditArticleForm;
