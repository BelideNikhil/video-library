import { Sidebar, Loading, PlaylistThumbnail, NewPlaylistCard } from "../../Components";
import { usePlaylist } from "../../Hooks";
import "./Playlist.css";

export default function Playlist() {
    const {
        playlistState: { isLoading, playlists },
    } = usePlaylist();

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <main className="main pt-12 playlist-thumbnail-wrapper">
                    <NewPlaylistCard />
                    {playlists?.map((eachPlaylist) => {
                        return <PlaylistThumbnail playlist={eachPlaylist} key={eachPlaylist._id} />;
                    })}
                </main>
            )}
        </div>
    );
}
