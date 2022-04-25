export function filterByCategory(videoList, selectedCategory) {
    if (videoList?.length && selectedCategory !== "All") {
        return [...videoList].filter((video) => {
            return video.category.toUpperCase() === selectedCategory.toUpperCase();
        });
    }
    return videoList;
}
