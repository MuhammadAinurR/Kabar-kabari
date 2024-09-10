import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/Login";
import AddArticleForm from "./pages/AddArticleForm";
import MyArticles from "./pages/MyArticles";
import EditArticleForm from "./pages/EditArticleForm";
import AddStaffForm from "./pages/AddStaffForm";
import EditImageArticleForm from "./pages/EditImageArticleForm";
import AllCategories from "./pages/AllCategories";
import AllArticles from "./pages/AllArticles";
import CmsAllCategories from "./pages/CmsAllCategories";

const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />,
        loader: () => {
            if (!localStorage.getItem('token')) return null;
            return redirect('/')
        }
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'categories',
                element: <AllCategories />
            },
            
            {
                path: ':category',
                element: <Home />
            },
            {
                path: 'n/:id',
                element: <Details />
            },
        ]
    },
    {
        element: <MainLayout />,
        path: 'cms',
        loader: () => {
            if (localStorage.getItem('token')) return null;
            return redirect('/login')
        },
        children: [
            {
                path: 'my-articles',
                element: <MyArticles />
            },
            {
                path: 'all-articles',
                element: <AllArticles />
            },
            {
                path: 'all-categories',
                element: <CmsAllCategories />
            },
            {
                path: 'add-staff',
                element: <AddStaffForm />,
            },
            {
                path: 'add-article',
                element: <AddArticleForm />
            },
            {
                path: ':id/edit',
                element: <EditArticleForm />
            },
            {
                path: ':id/img',
                element: <EditImageArticleForm />
            },

        ]
    },
    {
        path: "*",
        element: <div className="h-screen w-screen items-center flex justify-center">Page Not Found</div>,
    },
]);

export default router