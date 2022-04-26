import { useState } from "react";
import { useVideo } from "../../Hooks";
import { videoActionTypes } from "../../Reducers/ActionTypes";
import SortVideosModal from "./SortVideosModal";
import { useEffect, useRef } from "react";

const { SET_SELECTED_CATEGORY } = videoActionTypes;

export default function CategoryBar() {
    const [showSortModal, setSortModal] = useState(false);

    const {
        videoState: { categories, selectedCategory },
        videoDispatchFunction,
    } = useVideo();
    const sortModalRef = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (setSortModal && sortModalRef.current && !sortModalRef.current.contains(e.target)) {
                setSortModal(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => document.removeEventListener("mousedown", checkIfClickedOutside);
    }, [showSortModal]);

    return (
        <>
            <div className="category-bar-wrapper">
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
                <div style={{ position: "relative" }} ref={sortModalRef}>
                    <button
                        className="btn-icon sort-video-btn flex-row-center-center pointer"
                        onClick={() => setSortModal((prev) => !prev)}
                    >
                        <span className="material-icons-outlined mr-12">sort</span>
                        SORT
                    </button>
                    {showSortModal ? <SortVideosModal /> : null}
                </div>
            </div>
        </>
    );
}
