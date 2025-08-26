import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import "./LogHistory.css";

function LogHistory() {
  const [logHistory, setLogHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/logHistory")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch log history data");
        }
        return response.json();
      })
      .then((data) => {
        setLogHistory(data.logHistory);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fungsi untuk export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Watermark
    doc.setFontSize(18);
    doc.setTextColor(200, 200, 200);
    doc.text("ATKita", 14, 22);

    // Title
    doc.setFontSize(18);
    doc.setTextColor(67, 145, 94);
    doc.text("Log History", 14, 40);

    // Header
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Waktu Transaksi", 14, 50);
    doc.text("Barang Masuk", 60, 50);
    doc.text("Barang Keluar", 110, 50);
    doc.text("Divisi", 160, 50);
    doc.text("User", 190, 50);

    // Rows
    doc.setFontSize(10);
    let y = 60;
    logHistory.forEach((item) => {
      doc.text(item.waktu_transaksi, 14, y);
      doc.text(item.barang_masuk || "-", 60, y);
      doc.text(item.barang_keluar || "-", 110, y);
      doc.text(item.divisi || "-", 160, y);
      doc.text(item.user, 190, y);
      y += 10;
    });

    doc.save("log_history.pdf");
  };

  // Fungsi untuk export CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(logHistory);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "log_history.csv";
    link.click();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="log-history-container">
      <h2 className="header">Log History</h2>

      <div className="container-button">
        <button onClick={handleExportPDF} className="export-button">
          Export to PDF
        </button>
        <button onClick={handleExportCSV} className="export-button">
          Export to CSV
        </button>
      </div>

      {logHistory.length === 0 ? (
        <p>Tidak ada log history yang tersedia.</p>
      ) : (
        <div className="table-container">
          <table className="log-history-table">
            <thead>
              <tr>
                <th>Waktu Transaksi</th>
                <th>Barang Masuk</th>
                <th>Barang Keluar</th>
                <th>Divisi</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {logHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.waktu_transaksi}</td>
                  <td className="barang-masuk">
                    {item.barang_masuk ? item.barang_masuk : "-"}
                  </td>
                  <td className="barang-keluar">
                    {item.barang_keluar ? item.barang_keluar : "-"}
                  </td>
                  <td>{item.divisi || "-"}</td>
                  <td>{item.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LogHistory;
