// src/pages/Barang.js
import React from 'react';
import InputBarang from '../components/InputBarang';
import BarangList from '../components/BarangList';

function Barang() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h2 style={{ color: '#2d2d2d', textAlign: 'center' }}>Data Barang</h2>
      
      {/* Form Input Barang */}
      <div style={{ marginBottom: '20px' }}>
        <InputBarang />
      </div>
      
      {/* Daftar Barang */}
      <div>
        <BarangList />
      </div>
    </div>
  );
}

export default Barang;
