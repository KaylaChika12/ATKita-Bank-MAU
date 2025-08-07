import React, { useState } from 'react';
import '../index.css';

function InputBarang() {
  const [nama, setNama] = useState('');
  const [stok, setStok] = useState('');
  const [satuan, setSatuan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/barang', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, stok, satuan }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Barang berhasil ditambahkan');
        setNama('');
        setStok('');
        setSatuan('');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="form-card">
      <h2>Input Barang Baru</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Barang"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />
        <input
          type="text"
          placeholder="Satuan (misal: pcs, pack, dus)"
          value={satuan}
          onChange={(e) => setSatuan(e.target.value)}
        />
        <button type="submit">Tambah Barang</button>
      </form>
    </div>
  );
}

export default InputBarang;
