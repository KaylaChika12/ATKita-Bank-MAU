import React, { useEffect, useState, useCallback } from "react";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import "./BarangList.css";

function BarangList() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nama: "",
    stok: "",
    satuan: "",
  });

  const fetchBarang = useCallback(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:5000/api/barang")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal memuat data (status ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        // Pastikan fallback ke array kosong bila struktur respons tak sesuai
        const items = Array.isArray(data?.barang) ? data.barang : [];
        setBarang(items);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch barang saat mount
  useEffect(() => {
    fetchBarang();
  }, [fetchBarang]);

  // Perubahan edit input
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Simpan perubahan edit
  const handleSaveEdit = () => {
    const { id, nama, stok, satuan } = editData;

    if (!nama || nama.trim() === "" || !stok?.toString() || !satuan) {
      alert("Semua field harus diisi!");
      return;
    }

    fetch(`http://localhost:5000/api/barang/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, stok, satuan }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengupdate barang.");
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Barang berhasil diupdate.");
        setBarang((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, nama, stok, satuan } : item
          )
        );
        setEditDialog(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengupdate barang.");
      });
  };

  // Hapus barang
  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus barang ini?");
    if (!konfirmasi) return;

    fetch(`http://localhost:5000/api/barang/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal menghapus barang.");
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setBarang((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Terjadi kesalahan saat menghapus barang.");
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan saat menghubungi server.");
      });
  };

  // Export PDF
  const handleExportPDF = () => {
    if (!barang.length) {
      const lanjut = window.confirm(
        "Daftar barang kosong. Tetap buat PDF kosong?"
      );
      if (!lanjut) return;
    }

    const doc = new jsPDF();

    // Watermark / brand
    doc.setFontSize(18);
    doc.setTextColor(200, 200, 200);
    doc.text("ATKita", 14, 22);

    // Judul
    doc.setFontSize(18);
    doc.setTextColor(67, 145, 94);
    doc.text("Daftar Barang", 14, 40);

    // Header tabel
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Nama Barang", 14, 50);
    doc.text("Stok", 100, 50);
    doc.text("Satuan", 140, 50);

    // Isi
    let y = 60;

    if (!barang.length) {
      doc.text("Tidak ada data.", 14, y);
    } else {
      barang.forEach((item) => {
        doc.text(item.nama ?? "-", 14, y);
        doc.text(String(item.stok ?? "-"), 100, y);
        doc.text(item.satuan ?? "-", 140, y);
        y += 10;
      });
    }

    doc.save("barang_list.pdf");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!barang.length) {
      const lanjut = window.confirm(
        "Daftar barang kosong. Tetap unduh CSV kosong?"
      );
      if (!lanjut) return;
    }
    const csv = Papa.unparse(barang || []);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "barang_list.csv";
    link.click();
  };

  // UI state: loading
  if (loading) {
    return (
      <div className="barang-list-container">
        <h2 className="header">Daftar Barang</h2>
        <div className="skeleton-list">
          <div className="skeleton-row" />
          <div className="skeleton-row" />
          <div className="skeleton-row" />
        </div>
      </div>
    );
  }

  // UI state: error
  if (error) {
    return (
      <div className="barang-list-container">
        <h2 className="header">Daftar Barang</h2>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={fetchBarang} className="primary-button">
            Coba Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="barang-list-container">
      <h2 className="header">Daftar Barang</h2>

      <div className="container-button">
        <button onClick={handleExportPDF} className="export-button">
          Export to PDF
        </button>
        <button onClick={handleExportCSV} className="export-button">
          Export to CSV
        </button>
      </div>

      {/* UI state: kosong */}
      {barang.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration" aria-hidden>
            📦
          </div>
          <h3>Daftar barang kosong</h3>
          <p>
            Belum ada data barang yang tersedia. Tambahkan data di server, lalu
            klik <strong>Muat Ulang</strong>.
          </p>
          <div className="empty-actions">
            <button onClick={fetchBarang} className="primary-button">
              Muat Ulang
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="barang-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Stok</th>
                <th>Satuan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang.map((item) => (
                <tr key={item.id} className="barang-row">
                  <td>{item.nama}</td>
                  <td>{item.stok}</td>
                  <td>{item.satuan}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditData({
                          id: item.id,
                          nama: item.nama ?? "",
                          stok: item.stok ?? "",
                          satuan: item.satuan ?? "",
                        });
                        setEditDialog(true);
                      }}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog Edit */}
      {editDialog && (
        <div className="edit-dialog">
          <div
            className="dialog-overlay"
            onClick={() => setEditDialog(false)}
          ></div>
          <div className="dialog-content">
            <h3>Edit Barang</h3>
            <input
              type="text"
              name="nama"
              value={editData.nama}
              onChange={handleEditChange}
              placeholder="Nama Barang"
            />
            <input
              type="number"
              name="stok"
              value={editData.stok}
              onChange={handleEditChange}
              placeholder="Stok"
              min="0"
            />
            <input
              type="text"
              name="satuan"
              value={editData.satuan}
              onChange={handleEditChange}
              placeholder="Satuan"
            />
            <div className="dialog-actions">
              <button
                onClick={() => setEditDialog(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="save-button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarangList;
