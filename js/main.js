const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

// BlobServiceClient: The BlobServiceClient class allows you to manipulate Azure Storage resources and blob containers.
// ContainerClient: The ContainerClient class allows you to manipulate Azure Storage containers and their blobs.
// BlobClient: The BlobClient class allows you to manipulate Azure Storage blobs.


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function main() {
    try {
        console.log("Azure Blob storage v12 - JavaScript quickstart sample");
        if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
        }

        // Quick start code goes here
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

        //create a container
        const containerName = 'SammyAzure' + uuidv1();
        console.log('\nCreating container....');
        console.log('\t', containerName);

        //Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        //create a container
        const createContainerResponse = await containerClient.create();
        console.log("containerClient", createContainerResponse)
        console.log(
            `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
        );

        //list the blobs in the container
        for await (const blob of containerClient.listBlobsFlat()) {
            //get the blob conatiner name, to get the url
            const tempBlokBlobClient = containerClient.getBlobBatchClient(blob.name);

            // Display blob name and URL
            console.log(
                `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
            );
        }

        // Delete container
        console.log('\nDeleting container...');

        const deleteContainerResponse = await containerClient.delete();
        console.log(
            'Container was deleted successfully. requestId: ',
            deleteContainerResponse.requestId
        )


    } catch (err) {
        console.err(`Error: ${err.message}`);
    }
}

main()
    .then(() => console.log("Done"))
    .catch((ex) => console.log(ex.message));