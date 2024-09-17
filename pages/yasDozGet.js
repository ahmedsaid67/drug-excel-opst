import React, { useState } from 'react';
import axios from 'axios';

const DozBilgisiGetir = () => {
  const [ilacId, setIlacId] = useState('');
  const [yas, setYas] = useState('');
  const [yasBirimi, setYasBirimi] = useState('yil'); // Default olarak yıl seçili
  const [dozBilgisi, setDozBilgisi] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/appname/yasdoz/get_dosage_by_age', {
        params: {
          ilac_id: ilacId,
          yas: yas,
          yas_birimi: yasBirimi, // Yıl veya ay bilgisi gönderiliyor
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
          <label>Yaş:</label>
          <input
            type="text"
            value={yas}
            onChange={(e) => setYas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Yaş Birimi:</label>
          <select value={yasBirimi} onChange={(e) => setYasBirimi(e.target.value)}>
            <option value="yil">Yıl</option>
            <option value="ay">Ay</option>
          </select>
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
