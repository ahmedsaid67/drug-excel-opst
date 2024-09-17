import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IlacList = () => {
    const [ilaclar, setIlaclar] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [ilacId, setIlacId] = useState(''); // Detaylar için ID
    const [ilacDetay, setIlacDetay] = useState(null); // Tekil ilaç detayları
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Tüm ilaçları listeleyen fonksiyon -- paginasyon mevcuttur.
    const fetchAllIlaclar = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/appname/ilac/');
            setIlaclar(response.data.results);
            console.log(response.data.results)
        } catch (err) {
            setError('İlaçları yüklerken bir hata oluştu.');
            console.log("error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Kategoriye göre ilaçları listeleyen fonksiyon (paginasyonlu)
    const fetchIlaclarByCategory = async () => {
        if (!categoryId) return;
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/appname/ilac/medications-by-category/?category_id=${categoryId}&page=1`);
            setIlaclar(response.data.results);
        } catch (err) {
            setError('İlaçları kategoriye göre yüklerken bir hata oluştu.');
            console.log("error:",err)
        } finally {
            setLoading(false);
        }
    };

    // Kategoriye göre ilaçları listeleyen fonksiyon (paginasyonsuz)
    const fetchIlaclarByCategoryNoPagination = async () => {
        if (!categoryId) return;
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/appname/ilac/medications-by-category-no-pagination/?category_id=${categoryId}`);
            setIlaclar(response.data);
        } catch (err) {
            setError('İlaçları kategoriye göre yüklerken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    // İlaç detaylarını getiren fonksiyon
    const fetchIlacDetay = async () => {
        if (!ilacId) return;
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/appname/ilac/${ilacId}/`);
            setIlacDetay(response.data);
        } catch (err) {
            setError('İlaç detaylarını yüklerken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>İlaç Listesi</h1>
            <div>
                <button onClick={fetchAllIlaclar}>Tüm İlaçları Listele</button>
                <input
                    type="text"
                    placeholder="Kategori ID"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                />
                <button onClick={fetchIlaclarByCategory}>Kategoriye Göre Listele (Paginasyonlu)</button>
                <button onClick={fetchIlaclarByCategoryNoPagination}>Kategoriye Göre Listele (Paginasyonsuz)</button>
                <input
                    type="text"
                    placeholder="İlaç ID"
                    value={ilacId}
                    onChange={(e) => setIlacId(e.target.value)}
                />
                <button onClick={fetchIlacDetay}>İlaç Detayını Getir</button>
            </div>

            {loading && <p>Yükleniyor...</p>}
            {error && <p>{error}</p>}

            <ul>
                {ilaclar.length > 0 ? (
                    ilaclar.map(ilac => (
                        <li key={ilac.id}>
                            <strong>ID:</strong> {ilac.id} <br />
                            <strong>Adı:</strong> {ilac.name} <br />
                            <strong>Etken Madde:</strong> {ilac.etken_madde}<br/>
                            <strong>hassasiyet turu name:</strong> {ilac.hassasiyet_turu.name}
                        </li>
                    ))
                ) : (
                    <p>Gösterilecek ilaç bulunamadı.</p>
                )}
            </ul>

            {ilacDetay && (
                <div>
                    <h2>İlaç Detayı</h2>
                    <p><strong>ID:</strong> {ilacDetay.id}</p>
                    <p><strong>Adı:</strong> {ilacDetay.name}</p>
                    <p><strong>Etken Madde:</strong> {ilacDetay.etken_madde}</p>
                    <p><strong>Kullanım Uyarısı:</strong> {ilacDetay.kullanim_uyarisi}</p>
                    <p><strong>Kategori:</strong> {ilacDetay.ilac_kategori ? ilacDetay.ilac_kategori.name : 'Bilgi yok'}</p>
                    <p><strong>Hassasiyet Türü:</strong> {ilacDetay.hassasiyet_turu ? ilacDetay.hassasiyet_turu.name : 'Bilgi yok'}</p>
                    <p><strong>Hastalıklar:</strong> {ilacDetay.hastaliklar ? ilacDetay.hastaliklar.map(hastalik => hastalik.name).join(', ') : 'Bilgi yok'}</p>
                </div>
            )}
        </div>
    );
};

export default IlacList;

