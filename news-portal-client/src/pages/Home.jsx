import NewsMenu from "../components/NewsMenu";
export default function Home() {

    return (
        <div className="flex justify-center">
            <div className="w-3/5 flex flex-col gap-10 mt-5">
                {/* news section */}
                <NewsMenu />
            </div>
        </div>
    );
}