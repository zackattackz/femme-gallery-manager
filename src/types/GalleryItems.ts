interface BaseGalleryItem {
  blobName: string;
  displayName: string;
  isHero: boolean;
  position: number;
}

export type GalleryItem = UploadedGalleryItem | LocalGalleryItem;

export interface UploadedGalleryItem extends BaseGalleryItem {
  url: string;
}

export interface LocalGalleryItem extends BaseGalleryItem {
  filePath: string;
}

export function isLocalGalleryItem(galleryItem: GalleryItem): galleryItem is LocalGalleryItem {
  return (galleryItem as LocalGalleryItem).filePath !== undefined;
}
