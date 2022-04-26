export function sortByDateFunction(videoList, value) {
    if (value === "oldestFirst") {
        return [...videoList].sort((a, b) => {
            return new Date(a.uploadDate) - new Date(b.uploadDate);
        });
    }
    if (value === "newestFirst") {
        return [...videoList].sort((a, b) => {
            return new Date(b.uploadDate) - new Date(a.uploadDate);
        });
    }
    return videoList;
}
