function ArticleForm({handleChange, handleSubmit, data, categories}) {
    return (
        <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl pb-10 text-center">Edit Article</h1>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={data.title}
                    onChange={handleChange}
                />
                <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="content"
                    id="content"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={data.content}
                    onChange={handleChange}
                />
                <label htmlFor="content" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>
            </div>

            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    name="imgUrl"
                    id="imgUrl"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={data.imgUrl}
                    onChange={handleChange}
                />
                <label htmlFor="imgUrl" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image Url</label>
            </div>

            <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-500">Categories</label>
            <select
                id="categories"
                name="categoryId"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={data.categoryId}
                onChange={handleChange}
            >
                <option value='' name='categoryId'>-- Select Category --</option>
                {categories.map((e, i) => <option value={e.id} key={i} name='categoryId'>{e.name}</option>)}
            </select>

            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
                Submit
            </button>
        </form>
    )
}

export default ArticleForm