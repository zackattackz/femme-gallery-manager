import {BlobNameToItemMap} from 'src/types/BlobNameToItemMap';
import {keyBy, sortBy} from 'lodash';
import {ActionKinds, GalleryActions, RenameAction} from 'src/types/GalleryActions';
import {UploadedGalleryItem} from 'src/types/GalleryItems';
import IGalleryApi from 'src/types/IGalleryApi';
import FemmeContainerClient from './FemmeContainerClient';

const GalleryApi: IGalleryApi = {
  listGalleryItems: async function (returnSorted = true): Promise<UploadedGalleryItem[]> {
    const galleryItems: UploadedGalleryItem[] = [];
    const pagesAsync = FemmeContainerClient.listBlobsFlat({
      includeMetadata: true,
      prefix: 'gallery/',
    }).byPage();
    for await (const {segment} of pagesAsync) {
      for (const blob of segment.blobItems) {
        if (blob.metadata === undefined) {
          throw Error(`Blob doesnt have any metadata: ${blob.name}`);
        }
        const position = Number.parseInt(blob.metadata.position);
        const displayName = blob.metadata.displayName;
        const isHero = blob.metadata.isHero === 'true';
        const url = FemmeContainerClient.getBlobClient(blob.name).url;
        const blobName = blob.name;
        galleryItems.push({
          url,
          blobName,
          displayName,
          isHero,
          position,
        });
      }
    }
    if (returnSorted) {
      return sortBy(galleryItems, (item) => item.position);
      //galleryItems.sort((a, b) => a.position - b.position);
    }
    return galleryItems;
  },
  listGalleryItemsAsMap: async function (returnSorted = true): Promise<BlobNameToItemMap> {
    const galleryItems = await GalleryApi.listGalleryItems(returnSorted);
    return keyBy(galleryItems, (item) => item.blobName);
  },
  //runActions: async function (actions: GalleryActions): Promise<any> {},
};

function uploadBlob(blobName: string, filepath: string) {
  FemmeContainerClient.getBlockBlobClient(blobName).uploadFile(filepath);
}

export default GalleryApi;
