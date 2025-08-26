import React, { useState, useEffect } from "react";
import "../components/PengeluaranBarang.css";

function PengeluaranBarang() {
  const [barang, setBarang] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBarang, setFilteredBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [divisi, setDivisi] = useState("");

  // Load barang data
  useEffect(() => {
    fetch("http://localhost:5000/api/barang")
      .then((response) => response.json())
      .then((data) => {
        setBarang(data.barang);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = barang.filter((item) =>
        item.nama.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBarang(filtered);
    } else {
      setFilteredBarang([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!barang.length) {
      alert("Data barang belum dimuat.");
      return;
    }

    if (!selectedBarang) {
      alert("Silakan pilih barang terlebih dahulu.");
      return;
    }

    // Cari barang yang dipilih berdasarkan nama untuk mendapatkan ID
    const selectedItem = barang.find((item) => item.nama === selectedBarang);
    if (!selectedItem) {
      alert("Barang tidak ditemukan.");
      return;
    }

    const dataPengeluaran = {
      barang_id: selectedItem.id, // Mengirimkan ID barang
      jumlah,
      tanggal,
      divisi,
    };

    console.log("Data dikirim:", dataPengeluaran);

    // Fetch POST request to add pengeluaran
    fetch("http://localhost:5000/api/pengeluaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPengeluaran),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        // Reset form
        setSelectedBarang("");
        setJumlah("");
        setTanggal("");
        setDivisi("");
        setSearchQuery("");
        setFilteredBarang([]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-center text-2xl font-bold mb-6">
        Pengeluaran Barang
      </h2>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Cari Barang"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />

          {searchQuery && (
            <div className="mt-2">
              {filteredBarang.length > 0 ? (
                filteredBarang.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded p-3 mb-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedBarang(item.nama)}
                  >
                    <div className="font-semibold">{item.nama}</div>
                    <div className="text-sm text-gray-500">
                      Stok: {item.stok} {item.satuan}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">
                  Tidak ada barang yang ditemukan.
                </div>
              )}
            </div>
          )}

          {selectedBarang && (
            <div className="text-sm text-gray-600">
              Barang yang dipilih:{" "}
              <strong className="text-green-700">{selectedBarang}</strong>
            </div>
          )}

          <input
            type="number"
            placeholder="Jumlah"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          {/* Calendar input for selecting date */}
          <input
            type="datetime-local"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Divisi"
            value={divisi}
            onChange={(e) => setDivisi(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
          >
            Catat Pengeluaran
          </button>
        </form>
      </div>
    </div>
  );
}

export default PengeluaranBarang;
