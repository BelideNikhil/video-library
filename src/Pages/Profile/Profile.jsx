import { useAuth } from "../../Hooks";
import { Sidebar } from "../../Components";
import "./Profile.css";

export default function Profile() {
    const {
        authState: { userDetails },
        userLogoutHandler,
    } = useAuth();
    return (
        <div className="main-wrapper">
            <Sidebar />
            <main className="main profile-wrapper">
                <div className="profile pa-16">
                    <div className="avatar avatar-text avatar-round">
                        {userDetails?.firstName[0]}
                        {userDetails?.lastName[0]}
                    </div>
                    <div className="flex-row-spc-btw mb-12 user-details">
                        <div>Full Name: </div>
                        <div>
                            {userDetails?.firstName} {userDetails?.lastName}
                        </div>
                    </div>
                    <div className="flex-row-spc-btw mb-12 user-details">
                        <div>Email ID:</div>
                        <div>{userDetails?.email}</div>
                    </div>
                    <div className="flex-row-spc-btw mb-6">
                        <button
                            className="primary-accent btn-outline-primary px-16 py-8 pointer"
                            onClick={userLogoutHandler}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
