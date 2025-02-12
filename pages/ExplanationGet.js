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
      const response = await axios.get('https://api.ölçek.com/api/appname/explanationdoz/get-dosage-by-explanation', {
        params: {
          ilac_id: ilacId,

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


       
        <button type="submit">Doz Bilgisini Getir</button>
      </form>

      {dozBilgisi && (
        <div>
          <h3>Doz Bilgisi</h3>
          <p>Doz: {dozBilgisi.bilgi}</p>

        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DozBilgisiGetir;
