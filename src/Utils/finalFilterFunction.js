import { filterByCategory, sortByDateFunction, filterBySearchFunction } from "./index";
import { useVideo } from "../Hooks";

export function finalFilterFunction(videoList) {
    const { videoState } = useVideo();
    const searchedList = filterBySearchFunction(videoList, videoState.searchedText);
    const videosByCategory = filterByCategory(searchedList, videoState.selectedCategory);
    const videosByDate = sortByDateFunction(videosByCategory, videoState.sortBy);

    return videosByDate;
}
