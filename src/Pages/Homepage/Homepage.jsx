import "./Homepage.css";
import { useVideo } from "../../Hooks";
import { videoActionTypes } from "../../Reducers/ActionTypes";
import { useNavigate } from "react-router-dom";

const { SET_SELECTED_CATEGORY } = videoActionTypes;

const categories = ["Off Road Basics", "Tips n Tricks", "Travel", "Dakar"];

export default function Homepage() {
    const { videoDispatchFunction } = useVideo();
    const navigate = useNavigate();

    return (
        <div className="home-page-wrapper">
            <div className="hero-content flex-clmn-center-center txt-center">
                <h2 className="mb-16">Welcome to Off Road TV</h2>
                <button className="btn btn-solid-primary home-explore-btn mb-32" onClick={() => navigate("/explore")}>
                    Explore
                </button>
                <div className="flex-row-spc-btw">
                    <div>
                        {categories?.map((categ) => {
                            return (
                                <button
                                    onClick={() => {
                                        videoDispatchFunction({
                                            type: SET_SELECTED_CATEGORY,
                                            payload: { selectedCategory: categ },
                                        });
                                        navigate("/explore");
                                    }}
                                    className={`category-btn pointer ma-8 py-8 px-16`}
                                    key={categ}
                                >
                                    {categ}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <footer className="footer"></footer>
        </div>
    );
}
