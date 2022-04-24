import { getLoginDetails } from "./AuthServices/getLoginService";
import { getSignupDetails } from "./AuthServices/getSignupService";

import { getVideoList } from "./VideoServices/getVideoListService";

import { addToPlaylistService } from "./PlaylistServices/addToPlaylistService";
import { createPlaylistService } from "./PlaylistServices/createPlaylistService";
import { removeFromPlaylistService } from "./PlaylistServices/removeFromPlaylistService";
import { getAllPlaylistsService } from "./PlaylistServices/getAllPlaylistsService";
import { deletePlaylistService } from "./PlaylistServices/deletePlaylistService";
import { deleteVideoInPlaylistService } from "./PlaylistServices/deleteVideoInPlaylistService";

import { getNotesService } from "./NotesServices/getNotesService";
import { addNoteService } from "./NotesServices/addNoteService";
import { editNoteService } from "./NotesServices/editNoteService";
import { deleteNoteService } from "./NotesServices/deleteNoteService";

import { getHistoryService } from "./HistoryServices/getHistoryService";
import { addToHistoryService } from "./HistoryServices/addToHistoryService";
import { clearWatchHistoryService } from "./HistoryServices/clearWatchHistoryService";
import { removeFromHistoryService } from "./HistoryServices/removeFromHistoryService";

import { getWatchLaterService } from "./WatchLaterService/getWatchLaterService";
import { addToWatchLaterService } from "./WatchLaterService/addToWatchLaterService";
import { removeFromWatchLaterService } from "./WatchLaterService/removeFromWatchLaterService";

import { getLikesService } from "./LikedServices/getLikesService";
import { addToLikedVideoService } from "./LikedServices/addToLikedVideoService";
import { removeFromLikedService } from "./LikedServices/removeFromLikedVideoService";
export {
    getLoginDetails,
    getSignupDetails,
    getVideoList,
    addToPlaylistService,
    createPlaylistService,
    removeFromPlaylistService,
    getAllPlaylistsService,
    deletePlaylistService,
    getNotesService,
    addNoteService,
    editNoteService,
    deleteNoteService,
    deleteVideoInPlaylistService,
    getHistoryService,
    addToHistoryService,
    clearWatchHistoryService,
    removeFromHistoryService,
    getWatchLaterService,
    addToWatchLaterService,
    removeFromWatchLaterService,
    getLikesService,
    addToLikedVideoService,
    removeFromLikedService,
};
