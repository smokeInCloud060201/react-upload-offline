import {openDB} from "idb";
import {uploadService} from "../services/upload.service";


async function addItemsToStore() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const files = fileInput.files;
    if (files) {

        const db = await openDB('test-db4', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('images')) {
                    db.createObjectStore('images', {keyPath: 'id', autoIncrement: true})
                        .createIndex('name', 'name');
                }
            },
            terminated() {

            }
        });

        const tx: any = db.transaction('images', 'readwrite');

        const imagePromises = Array.from(files).map((imageFile, index) => {
            const imageBlob = new Blob([imageFile], {type: imageFile.type});

            return tx.store.add({
                name: `Image ${index + 1}`,
                image: imageBlob,
                created: new Date().getTime(),
            });
        });

        await Promise.all(imagePromises);
        await tx.done;
        console.log(`${files.length} images have been stored successfully.`);

    }
}


async function getItemFromStore() {
    const db = await openDB('test-db4', 1);
    const tx = db.transaction('images', "readonly");
    const store: any = tx.store;
    const index = store.index('name');

    const images = await index.getAll();
    console.log('Sandwich Record:', images);

    images.forEach((record: any) => {
        const imageUrl = URL.createObjectURL(record.image);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Image`;
        document.body.appendChild(imgElement);
    });

}


const saveImages = () => {
    addItemsToStore();

};

const getValue = async () => {
    const requestBody = [1, 2, 3, 4, 5];
    const {data} = await uploadService.uploadImages({files: requestBody});

    getItemFromStore();
}
