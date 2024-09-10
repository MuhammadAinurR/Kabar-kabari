import { useEffect, useState } from "react";
import request from "../utils/axios";
import showToast from "../utils/toast";
import ArticleForm from "../components/ArticleForm";

function AddArticleForm() {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        title: '',
        content: '',
        imgUrl: '',
        categoryId: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = `/pub/categories`;
                const { data } = await request.get(endpoint);
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const endpoint = `/articles`;
            const response = await request.post(endpoint, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            setData({
                title: '',
                content: '',
                imgUrl: '',
                categoryId: ''
            })
            console.log('Article added:', response.data);
            showToast({ message: `${data.title} successfully added`, type: 'success' })
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

export default AddArticleForm