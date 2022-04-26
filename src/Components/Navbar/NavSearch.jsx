import { useLocation, useNavigate } from "react-router-dom";
import { useVideo } from "../../Hooks";
import { videoActionTypes } from "../../Reducers/ActionTypes";
import { debounce } from "../../Utils";

const { SET_SEARCH_TXT } = videoActionTypes;

export default function NavSearch() {
    const { videoDispatchFunction } = useVideo();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function changeHandler(e) {
        videoDispatchFunction({ type: SET_SEARCH_TXT, payload: { searchedText: e.target.value } });
        if (pathname !== "/explore") {
            navigate("/explore");
        }
    }
    return (
        <form className="header-search-form flex-row-start-center" onSubmit={(e) => e.preventDefault()}>
            <input
                type="search"
                className="search-input pa-8"
                placeholder="Search..."
                onChange={debounce(changeHandler)}
            />
        </form>
    );
}
