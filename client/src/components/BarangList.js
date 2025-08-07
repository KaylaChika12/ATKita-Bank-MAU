import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./BarangList.css";
import Papa from "papaparse";
import "../components/BarangList.css";

function BarangList() {
  const [barang, setBarang] = useState([]);
  const [editDialog, setEditDialog] = useState(false); // Untuk menampilkan dialog
  const [editData, setEditData] = useState({
    id: "",
    nama: "",
    stok: "",
    satuan: "",
  });

  // Fetch barang data
  useEffect(() => {
    fetch("http://localhost:5000/api/barang")
      .then((response) => response.json())
      .then((data) => setBarang(data.barang))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Fungsi untuk menangani perubahan data barang
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fungsi untuk menyimpan perubahan
  const handleSaveEdit = () => {
    const { id, nama, stok, satuan } = editData;

    if (!nama || !stok || !satuan) {
      alert("Semua field harus diisi!");
      return;
    }

    fetch(`http://localhost:5000/api/barang/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, stok, satuan }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        // Update data barang di frontend
        setBarang((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, nama, stok, satuan } : item
          )
        );
        setEditDialog(false); // Close the dialog
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengupdate barang.");
      });
  };

  // Fungsi untuk menghapus barang
  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus barang ini?");
    if (!konfirmasi) return;

    fetch(`http://localhost:5000/api/barang/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setBarang((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Terjadi kesalahan saat menghapus barang.");
        }
      })
      .catch((error) => {
        alert("Terjadi kesalahan saat menghubungi server.");
      });
  };

  // Fungsi untuk export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Set font size and add watermark
    doc.setFontSize(18);
    doc.setTextColor(200, 200, 200); // Light gray color for watermark
    doc.text("ATKita", 14, 22);

    // Title with primary color
    doc.setFontSize(18);
    doc.setTextColor(67, 145, 94); // Green color
    doc.text("Daftar Barang", 14, 40);

    // Table Header with primary color
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black for table headers
    doc.text("Nama Barang", 14, 50);
    doc.text("Stok", 100, 50);
    doc.text("Satuan", 140, 50);

    // Table Rows
    let y = 60;
    barang.forEach((item) => {
      doc.text(item.nama, 14, y);
      doc.text(String(item.stok), 100, y);
      doc.text(item.satuan, 140, y);
      y += 10;
    });

    // Save the PDF
    doc.save("barang_list.pdf");
  };

  // Fungsi untuk export CSV menggunakan papaparse
  const handleExportCSV = () => {
    const csv = Papa.unparse(barang); // Convert the barang array to CSV format

    // Create a Blob from CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "barang_list.csv"; // Set the file name

    // Trigger download
    link.click();
  };

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

      {barang.length === 0 ? (
        <p>Tidak ada barang yang tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="barang-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Stok</th>
                <th>Satuan</th>
                <th>Action</th>
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
                        setEditData(item);
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

      {/* Dialog for Edit Barang */}
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
