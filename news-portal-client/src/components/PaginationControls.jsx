const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-between mt-4">
        <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
        >
            Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
        >
            Next
        </button>
    </div>
);

export default PaginationControls;