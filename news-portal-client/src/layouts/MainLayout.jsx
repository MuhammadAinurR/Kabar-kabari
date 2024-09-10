import Categories from "../components/Categories";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
    return <>
    <Navbar />
    <Categories />
    <Outlet />
    </>
}

export default MainLayout