import React, { useState } from 'react';
import axios from 'axios';

const DosageCalculator = () => {
    const [age, setAge] = useState('');
    const [kilo, setKilo] = useState('');
    const [ilacId, setIlacId] = useState('');
    const [hastalikId, setHastalikId] = useState('');
    const [message, setMessage] = useState('');
    const [kullanimSikligi, setKullanimSikligi] = useState('');
    const [checkUyari, setCheckUyari] = useState('');
    const [thresholdAge, setThresholdAge] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showKiloInput, setShowKiloInput] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // İlk API isteği (threshold_age'yi kontrol ediyoruz)
            const response = await axios.get('http://127.0.0.1:8000/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-detail-data/', {
                params: {
                    ilac_id: ilacId,
                    hastalik_id: hastalikId,
                    age
                }
            });

            const { threshold_age } = response.data;
            setThresholdAge(threshold_age);

            // Eğer age threshold_age'den küçükse kilo bilgisi alıp tekrar istek yapacağız
            if (parseInt(age) < threshold_age) {
                setShowKiloInput(true); // Kilo bilgisini kullanıcıdan istemek için inputu açıyoruz
            } else {
                // Yaş threshold_age'e eşit veya büyükse, kilo bilgisi olmadan istek yapıyoruz
                const responseWithoutKilo = await axios.get('http://127.0.0.1:8000/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-hastalik-azalan-doz-hem-kilo-hem-yas/', {
                    params: {
                        age,
                        ilac_id: ilacId,
                        hastalik_id: hastalikId
                    }
                });

                setMessage(responseWithoutKilo.data.message);
                setKullanimSikligi(responseWithoutKilo.data.kullanim_sikligi);
                setCheckUyari(responseWithoutKilo.data.check_uyari);
                setShowKiloInput(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error || 'Bir hata oluştu.');
            } else {
                setMessage('Bir hata oluştu.');
            }
            console.error("error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKiloSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Kilo bilgisi ile tekrar istek yapıyoruz
            const kiloResponse = await axios.get('http://127.0.0.1:8000/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-hastalik-azalan-doz-hem-kilo-hem-yas/', {
                params: {
                    age,
                    kilo,
                    ilac_id: ilacId,
                    hastalik_id: hastalikId
                }
            });

            setMessage(kiloResponse.data.message);
            setKullanimSikligi(kiloResponse.data.kullanim_sikligi);
            setCheckUyari(kiloResponse.data.check_uyari);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error || 'Bir hata oluştu.');
            } else {
                setMessage('Bir hata oluştu.');
            }
            console.error("error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="age">Yaş:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
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
                <div>
                    <label htmlFor="hastalik_id">Hastalık ID:</label>
                    <input
                        type="number"
                        id="hastalik_id"
                        value={hastalikId}
                        onChange={(e) => setHastalikId(e.target.value)}
                        required
                    />
                </div>

                {/* Eğer yaş threshold_age'den küçükse kilo bilgisi sor */}
                {showKiloInput && (
                    <div>
                        <label htmlFor="kilo">Kilo:</label>
                        <input
                            type="number"
                            id="kilo"
                            value={kilo}
                            onChange={(e) => setKilo(e.target.value)}
                            required
                        />
                        <button onClick={handleKiloSubmit} type="submit" disabled={loading}>
                            {loading ? 'Yükleniyor...' : 'Kilo ile Gönder'}
                        </button>
                    </div>
                )}

                {/* Eğer kilo gerekli değilse doğrudan gönder */}
                {!showKiloInput && (
                    <button type="submit" disabled={loading}>
                        {loading ? 'Yükleniyor...' : 'Gönder'}
                    </button>
                )}
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
        </div>
    );
};

export default DosageCalculator;
