function SortButton({switchSort}) {
    return (
        <button onClick={switchSort} className="text-xl hover:font-semibold text-gray-700">Sort ⇅</button>
    )
}

export default SortButton