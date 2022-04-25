import { useVideo } from "../../Hooks";
import { videoActionTypes } from "../../Reducers/ActionTypes";

const { SET_SORT_BY_DATE } = videoActionTypes;

export default function SortVideosModal() {
    const {
        videoDispatchFunction,
        videoState: { sortBy },
    } = useVideo();

    return (
        <form
            className="sort-videos-modal  flex-clmn-start-start pa-12"
            onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <label className="flex-row-start-center pa-6">
                <input
                    type="radio"
                    name="sort-by-date"
                    value="newestFirst"
                    checked={sortBy === "newestFirst"}
                    className="mr-12"
                    onChange={(e) => {
                        e.stopPropagation();
                        videoDispatchFunction({ type: SET_SORT_BY_DATE, payload: { sortBy: e.target.value } });
                    }}
                />
                Date added (newest)
            </label>
            <label className="flex-row-start-center pa-6">
                <input
                    type="radio"
                    name="sort-by-date"
                    value="oldestFirst"
                    checked={sortBy === "oldestFirst"}
                    className="mr-12"
                    onChange={(e) => {
                        e.stopPropagation();
                        videoDispatchFunction({ type: SET_SORT_BY_DATE, payload: { sortBy: e.target.value } });
                    }}
                />
                Date added (oldest)
            </label>
        </form>
    );
}
