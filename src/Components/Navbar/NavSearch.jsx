export default function NavSearch() {
    return (
        <form
            className="header-search-form flex-row-start-center"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input type="text" className="search-input pa-8" placeholder="Search..." />
            <button className="btn-icon btn-icon-sm clear-search-btn" type="button">
                <i className="fas fa-times"></i>
            </button>
        </form>
    );
}
