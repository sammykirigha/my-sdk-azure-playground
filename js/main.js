const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

// BlobServiceClient: The BlobServiceClient class allows you to manipulate Azure Storage resources and blob containers.
// ContainerClient: The ContainerClient class allows you to manipulate Azure Storage containers and their blobs.
// BlobClient: The BlobClient class allows you to manipulate Azure Storage blobs.


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const account_key = process.env.ACCOUNT_KEY
const account_name = 'sdkplayground123456';


console.log("Azure Blob storage v12 - JavaScript quickstart sample");
if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
}

// Quick start code goes here
const key_credential = new StorageSharedKeyCredential(account_name, account_key)

const blob_client = new BlobServiceClient(`https://${account_name}.blob.core.windows.net`, key_credential);

async function container_inventory() {
    let containers = blob_client.listContainers();
    for await (const container of containers) {
        console.log(container.name)
        //Get a reference to a container
        const containerClient = blob_client.getContainerClient(container.name);
        //list the blobs in the container
        const blobs = containerClient.listBlobsFlat()
        for await (const blob of blobs) {
            //get the blob conatiner name, to get the url
            const tempBlokBlobClient = containerClient.getBlobBatchClient(blob.name);

            // Display blob name and URL
            console.log(
                `\n\tname: ${blob.name}\n\tURL: ${tempBlokBlobClient.url}\n`
            );
        }
    }
}


container_inventory();