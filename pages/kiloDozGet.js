import React, { useState } from 'react';
import axios from 'axios';

const DosageCalculator = () => {
    const [kilo, setKilo] = useState('');
    const [ilacId, setIlacId] = useState('');
    const [message, setMessage] = useState('');
    const [kullanimSikligi, setKullanimSikligi] = useState('');
    const [checkUyari, setCheckUyari] = useState('');
    const [maksimumAnlikDoz, setMaksimumAnlikDoz] = useState('');
    const [maksimumGunlukDoz, setMaksimumGunlukDoz] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/appname/kilodoz/get-dosage-by-weight/', {
                params: {
                    kilo: kilo,
                    ilac_id: ilacId,
                }
            });
            setMessage(response.data.message);
            setKullanimSikligi(response.data.kullanim_sikligi);
            setCheckUyari(response.data.check_uyari);
            setMaksimumAnlikDoz(response.data.maksimum_anlik_doz);
            setMaksimumGunlukDoz(response.data.maksimum_gunluk_doz);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error || 'Bir hata oluştu.');
            } else {
                setMessage('Bir hata oluştu.');
            }
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="kilo">Kilo:</label>
                    <input
                        type="number"
                        id="kilo"
                        value={kilo}
                        onChange={(e) => setKilo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ilac_id">İlaç ID:</label>
                    <input
                        type="number"
                        id="ilac_id"
                        value={ilacId}
                        onChange={(e) => setIlacId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Yükleniyor...' : 'Gönder'}
                </button>
            </form>
            {message && <p>{message}</p>}
            {kullanimSikligi && (
                <div>
                    <h3>Kullanım Sıklığı:</h3>
                    <p>{kullanimSikligi}</p>
                </div>
            )}
            {checkUyari && (
                <div>
                    <h3>Check Uyarı:</h3>
                    <p>{checkUyari}</p>
                </div>
            )}
            {maksimumAnlikDoz && (
                <div>
                    <h3>Maksimum Anlık Doz:</h3>
                    <p>{maksimumAnlikDoz} ml</p>
                </div>
            )}
            {maksimumGunlukDoz && (
                <div>
                    <h3>Maksimum Günlük Doz:</h3>
                    <p>{maksimumGunlukDoz} ml</p>
                </div>
            )}
        </div>
    );
};

export default DosageCalculator;

