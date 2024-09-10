import { useEffect, useState } from "react";
import request from "../utils/axios";
import { useParams } from "react-router-dom";
import showToast from "../utils/toast";

function EditImageArticleForm() {
    const [imgUrl, setImgUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const articleId = useParams().id;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `articles/${articleId}`;
                const { data } = await request.get(endpoint, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setImgUrl(data.imgUrl);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [articleId]);

    const handleFileChange = (event) => setSelectedFile(event.target.files[0])

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('img', selectedFile);

        try {
            const endpoint = `articles/${articleId}/img`;
            await request.patch(endpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Refresh the image URL after successful upload
            const response = await request.get(`articles/${articleId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setImgUrl(response.data.imgUrl);
            setLoading(false)
            showToast({ message: 'Success change image', type: 'success' });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen h-[90vh]">
            <h1 className="text-3xl pb-5 text-center">Edit Image</h1>
            {loading &&
                <div class="loadingio-spinner-wedges-nq4q5u6dq7r">
                    <div class="ldio-x2uulkbinbj">
                        <div>
                            <div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {!loading && <img className="rounded-md shadow-xl mb-4" src={imgUrl} alt="Article" />}
            <div className="flex items-center border-2 ps-2 rounded-md shadow-md">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload} className="bg-[#1F2937] text-white py-2 px-4 rounded-md">
                    Upload Image
                </button>
            </div>
        </div>
    );
}

export default EditImageArticleForm;
