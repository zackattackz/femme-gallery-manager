import {BlobNameToItemMap} from './BlobNameToItemMap';
import {GalleryActions} from './GalleryActions';
import {UploadedGalleryItem} from './GalleryItems';

export default interface IGalleryApi {
  listGalleryItems(returnSorted?: boolean): Promise<UploadedGalleryItem[]>;
  listGalleryItemsAsMap(returnSorted?: boolean): Promise<BlobNameToItemMap>;
  //runActions(actions: GalleryActions): Promise<any>;
}
