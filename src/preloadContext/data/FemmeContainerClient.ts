import {
    BlobServiceClient,
    StorageSharedKeyCredential
} from "@azure/storage-blob";
const containerName = process.env.ACCOUNT_NAME;
const accountKey = process.env.ACCOUNT_KEY;

if(!containerName || !accountKey){
    throw Error(".env is not loaded");
}

const blobUrl = `https://${containerName}.blob.core.windows.net`;

const sharedKeyCredential = new StorageSharedKeyCredential(containerName, accountKey);

const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    blobUrl,
    sharedKeyCredential
);
const femmeContainerClient = blobServiceClient.getContainerClient(containerName);

export default femmeContainerClient;