import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import {
    ThemeProvider,
    AuthProvider,
    VideoProvider,
    PlaylistProvider,
    NotesProvider,
    HistoryProvider,
    WatchLaterProvider,
    LikesProvider,
} from "./Context";
// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <VideoProvider>
                        <PlaylistProvider>
                            <NotesProvider>
                                <HistoryProvider>
                                    <WatchLaterProvider>
                                        <LikesProvider>
                                            <App />
                                        </LikesProvider>
                                    </WatchLaterProvider>
                                </HistoryProvider>
                            </NotesProvider>
                        </PlaylistProvider>
                    </VideoProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
