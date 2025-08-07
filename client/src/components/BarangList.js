import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./BarangList.css"; // Import the CSS file for styling

function BarangList() {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/barang")
      .then((response) => response.json())
      .then((data) => setBarang(data.barang))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus barang ini?");
    if (!konfirmasi) return;

    console.log("Menghapus barang dengan ID:", id);

    fetch(`http://localhost:5000/api/barang/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response dari server:", data);
        if (data.message) {
          alert(data.message);
          setBarang((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Terjadi kesalahan saat menghapus barang.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menghubungi server.");
      });
  };

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

  return (
    <div className="barang-list-container">
      <h2 className="header">Daftar Barang</h2>

      <button onClick={handleExportPDF} className="export-button">
        Export to PDF
      </button>

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
    </div>
  );
}

export default BarangList;
