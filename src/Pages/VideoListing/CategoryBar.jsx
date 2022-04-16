import { useVideo } from "../../Hooks";
import { videoActionTypes } from "../../Reducers/ActionTypes";

const { SET_SELECTED_CATEGORY } = videoActionTypes;

export default function CategoryBar() {
    const {
        videoState: { categories, selectedCategory },
        videoDispatchFunction,
    } = useVideo();

    return (
        <div>
            {categories?.map((categ) => {
                return (
                    <button
                        onClick={() =>
                            videoDispatchFunction({
                                type: SET_SELECTED_CATEGORY,
                                payload: { selectedCategory: categ },
                            })
                        }
                        className={`category-btn pointer ma-8 py-8 px-16 ${
                            selectedCategory.toUpperCase() === categ.toUpperCase() ? "active" : ""
                        }`}
                        key={categ}
                    >
                        {categ}
                    </button>
                );
            })}
        </div>
    );
}
