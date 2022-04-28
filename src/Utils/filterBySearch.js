export function filterBySearchFunction(videoList, searchedText) {
    if (searchedText.trim() !== "") {
        return videoList.filter((video) => {
            return (
                video.title.toUpperCase().includes(searchedText.trim().toUpperCase()) ||
                video.description.toUpperCase().includes(searchedText.trim().toUpperCase()) ||
                video.creator.toUpperCase().includes(searchedText.trim().toUpperCase())
            );
        });
    }
    return videoList;
}
