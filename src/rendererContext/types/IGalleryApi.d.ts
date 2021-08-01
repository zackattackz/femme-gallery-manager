import IGalleryItem from "./IGalleryItem";

export default interface IGalleryApi {
    listGalleryItems(returnSorted?: boolean): Promise<IGalleryItem[]>;
    // uploadGalleryItem()
}


