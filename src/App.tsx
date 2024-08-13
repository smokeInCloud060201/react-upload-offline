import React, {useEffect, useState} from 'react';
import {openDB} from 'idb';

function App() {


    async function addItemsToStore() {
        const db = await openDB('test-db4', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('foods')) {
                    db.createObjectStore('foods', {keyPath: 'name'});
                }
            }
        });

        // Create a transaction on the 'foods' store in read/write mode:
        const tx = db.transaction('foods', 'readwrite');

        // Add multiple items to the 'foods' store in a single transaction:
        await Promise.all([
            tx.store.add({
                name: 'Sandwich',
                price: 4.99,
                description: 'A very tasty sandwich!',
                created: new Date().getTime(),
            }),
            tx.store.add({
                name: 'Eggs',
                price: 2.99,
                description: 'Some nice eggs you can cook up!',
                created: new Date().getTime(),
            }),
            tx.done
        ]);
    }


    async function getItemFromStore() {
        const db = await openDB('test-db4', 1);
        const value = await db.get('foods', 'Sandwich');

        console.dir(value);
    }


    const saveImages = () => {
        addItemsToStore();

    };

    const getValue = () => {
        getItemFromStore();


    }


    return (
        <div className="" style={{height: "100vh"}}>
            <header className="header" style={{height: "5rem"}}>
                hello
            </header>
            <main>

                <button type="button" onClick={saveImages}>Save</button>
                <button type="button" onClick={getValue}>getValue</button>
                <div>

                </div>
            </main>
        </div>
    );
}

export default App;
