import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import "./LogHistory.css"; // Import the CSS file for styling

function LogHistory() {
  const [logHistory, setLogHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading status
  const [error, setError] = useState(null); // Adding error status

  useEffect(() => {
    fetch("http://localhost:5000/api/logHistory")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch log history data"); // Error handling for response
        }
        return response.json();
      })
      .then((data) => {
        setLogHistory(data.logHistory);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Handle error if fetch fails
        setLoading(false);
      });
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Set font size and add watermark
    doc.setFontSize(18);
    doc.setTextColor(200, 200, 200); // Light gray color for watermark
    doc.text("ATKita", 14, 22);

    // Title with primary color
    doc.setFontSize(18);
    doc.setTextColor(67, 145, 94); // Green color
    doc.text("Log History", 14, 40);

    // Table Header with primary color
    doc.setFontSize(12); // Adjusted font size for header
    doc.setTextColor(0, 0, 0); // Black for table headers
    doc.text("Waktu Transaksi", 14, 50);
    doc.text("Barang Masuk", 60, 50);
    doc.text("Barang Keluar", 120, 50);
    doc.text("User", 180, 50);

    // Table Rows with smaller font size
    doc.setFontSize(10); // Reduced font size for table rows
    let y = 60;
    logHistory.forEach((item) => {
      doc.text(item.waktu_transaksi, 14, y);
      doc.text(item.barang_masuk || "-", 60, y);
      doc.text(item.barang_keluar || "-", 120, y);
      doc.text(item.user, 180, y);
      y += 10;
    });

    // Save the PDF
    doc.save("log_history.pdf");
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div className="error">Error: {error}</div>; // Show error message if there is an issue
  }

  return (
    <div className="log-history-container">
      <h2 className="header">Log History</h2>

      {/* Export to PDF Button */}
      <button onClick={handleExportPDF} className="export-button">
        Export to PDF
      </button>

      {logHistory.length === 0 ? (
        <p>Tidak ada log history yang tersedia.</p> // Show message if no data is available
      ) : (
        <div className="table-container">
          <table className="log-history-table">
            <thead>
              <tr>
                <th>Waktu Transaksi</th>
                <th>Barang Masuk</th>
                <th>Barang Keluar</th>
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
