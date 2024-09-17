import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/UploadExcel.module.css'; // Import the CSS module

const UploadExcel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/appname/hastalikyasdoz/bulk_create_from_excel/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully');
        } catch (error) {
            alert('Error uploading file');
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Hastalık Yas Doz Üret</h1>
            <p className={styles.subtitle}>Excel dosyasını yükleyerek ilaç kategorilerini topluca oluşturun.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={handleFileChange} 
                    className={styles.fileInput}
                />
                <button type="submit" className={styles.submitButton}>Yükle</button>
            </form>
        </div>
    );
};

export default UploadExcel;
