import React, { useState } from 'react';
import axios from 'axios';

const DozBilgisiGetir = () => {
  const [ilacId, setIlacId] = useState('');
  const [hastalikId, setHastalikId] = useState(''); // Hastalık ID alanı eklendi
  const [dozBilgisi, setDozBilgisi] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/appname/hastalikyasdoz/get-dosage-by-age-and-disease', {
        params: {
          ilac_id: ilacId,
          hastalik_id: hastalikId, // Hastalık ID bilgisi gönderiliyor
        },
      });

      setDozBilgisi(response.data);
      setError(''); // Hata varsa sıfırla
    } catch (err) {
      setDozBilgisi(null); // Doz bilgisi bulunamadıysa sıfırla
      setError(err.response?.data?.detail || 'Bilinmeyen bir hata oluştu.');
    }
  };

  return (
    <div>
      <h2>Doz Bilgisi Getir</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>İlaç ID:</label>
          <input
            type="text"
            value={ilacId}
            onChange={(e) => setIlacId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hastalık ID:</label> {/* Hastalık ID alanı eklendi */}
          <input
            type="text"
            value={hastalikId}
            onChange={(e) => setHastalikId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Doz Bilgisini Getir</button>
      </form>

      {dozBilgisi && (
        <div>
          <h3>Doz Bilgisi</h3>
          <p>Doz: {dozBilgisi.doz}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DozBilgisiGetir;
