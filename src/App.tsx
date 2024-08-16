import React, {useEffect, useState} from 'react';
import {openDB} from 'idb';
import {uploadService} from "./services/upload.service";
import useInternetConnection from "./hooks/useInternetConnection";
import {Toast} from "./components/toast";


function App() {

    const isOnline = useInternetConnection();

    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        setShowToast(true);
    }, [isOnline]);

    useEffect(() => {
        const worker = new Worker(new URL("./worker/worker.ts", import.meta.url));
        worker.postMessage('PUSH_OFFLINE');

        worker.postMessage('RESET_EXPIRED_RECORD');

        worker.onmessage = (e ) => {
            console.log(e.data + ' on main');
        }

        return () => {
            worker.terminate();
        };
    }, []);


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
                const imageBlob = new Blob([imageFile], { type: imageFile.type });

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
        const requestBody = [1, 2, 3, 4,5];
        const {data} = await uploadService.uploadImages({files: requestBody});

        getItemFromStore();
    }




    return (
        <div className="" style={{height: "100vh", position: 'relative', overflow: 'hidden'}}>
            <header className="header" style={{height: "5rem"}}>
                hello
            </header>
            <main>
                <input type="file" id="fileInput" multiple/>
                <button type="button" onClick={saveImages}>Save Image</button>
                <button type="button" onClick={getValue}>getValue</button>
                <div>

                </div>
            </main>
            {showToast && <Toast type={isOnline ? "SUCCESS" : "ERROR"} message={isOnline ? "You are online" : "You are offline"} onClose={() => setShowToast(false)} />}
        </div>
    );
}

export default App;
