import React from 'react';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

interface Product {
    name: string;
}

function ProductList() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [product, setProduct] = useState<Product[]>([]);
    const [newData, setNewData] = useState<string>("");

    const fetchDataFromApi = async () => {
        const fetchedData: Product[] = [];
        try {
            const response = await fetch('https://dummyapi.online/api/products')
                if (response.status === 200) {
                    const jsonData: Product[] = await response.json();
                    jsonData.forEach((doc) => {
                        fetchedData.push({ name: doc.name });

                    });
                    setProduct(fetchedData);
                }
        }   catch (error) {
            console.error('Error fetching information', error);
        }
    };

    const fetchDataFromFs = async () => {
        const querySnapshot = await getDocs(collection(db, "product"));
        const fetchedData: Product[] = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data() as Product;
            fetchedData.push({ name: docData.name });
        });
        setProduct(fetchedData);
    }

    useEffect(() => {
        fetchDataFromFs();
    }, []);

    const addData = async () => {
        if (newData) {
            await addDoc(collection(db, "product"), {
                name: newData,
            });
            setNewData("");
            fetchDataFromApi();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData(e.target.value);
    };

    return (
        <div>
            <h2>Add product</h2>
            <ul>
                {product.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newData}
                onChange={handleInputChange}
                placeholder="More information"
            />
            <button onClick={addData}>Add</button>
        </div>
    );
}

export default ProductList;