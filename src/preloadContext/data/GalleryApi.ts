import IGalleryApi from "../../rendererContext/types/IGalleryApi";
import IGalleryItem from "../../rendererContext/types/IGalleryItem";
import FemmeContainerClient from "./FemmeContainerClient";


const GalleryApi: IGalleryApi = {
    listGalleryItems: async function (returnSorted: boolean = true): Promise<IGalleryItem[]> {
        const galleryItems: IGalleryItem[] = [];
        const pagesAsync = FemmeContainerClient.listBlobsByHierarchy("/gallery", { includeMetadata: true }).byPage();
        for await (const { segment } of pagesAsync) {
          for (const blob of segment.blobItems) {
            if (blob.metadata === undefined) {
              throw Error(`Blob doesnt have any metadata: ${blob.name}`);
            }
            const position = Number.parseInt(blob.metadata.position);
            const url = FemmeContainerClient.getBlobClient(blob.name).url;
            galleryItems.push({
              // url: `${blobUrl}/${containerName}/${blob.name}`,
              url,
              position
            });
          }
        }
        if (returnSorted) {
          galleryItems.sort((a, b) => a.position - b.position);
        }
        return galleryItems;
      }
}

export default GalleryApi;