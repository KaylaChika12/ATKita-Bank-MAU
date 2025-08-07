-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2025 at 04:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atkita`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL,
  `satuan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama`, `stok`, `satuan`) VALUES
(2, 'Buku Tulis', 35, 'Lembar'),
(3, 'Pulpen', 200, 'Biji'),
(4, 'Penghapus', 150, 'Biji'),
(5, 'Rautan', 75, 'Biji'),
(9, 'Kopi', 190, 'pcs');

-- --------------------------------------------------------

--
-- Table structure for table `log_history`
--

CREATE TABLE `log_history` (
  `id` int(11) NOT NULL,
  `barang_masuk` text DEFAULT NULL,
  `barang_keluar` text DEFAULT NULL,
  `waktu_transaksi` datetime DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_history`
--

INSERT INTO `log_history` (`id`, `barang_masuk`, `barang_keluar`, `waktu_transaksi`, `user`) VALUES
(1, 'Pensil x30', 'Pensil x10', '2025-08-01 09:00:00', 'Admin'),
(2, 'Buku Tulis x20', 'Buku Tulis x5', '2025-08-02 10:00:00', 'Admin'),
(3, 'Pulpen x50', 'Pulpen x20', '2025-08-03 11:00:00', 'Admin'),
(4, 'Penghapus x25', 'Penghapus x10', '2025-08-04 14:00:00', 'Admin'),
(5, 'Rautan x40', 'Rautan x15', '2025-08-05 16:00:00', 'Admin'),
(6, NULL, '2 x10', '2025-08-06 00:00:00', 'Admin'),
(7, 'Botol x10', NULL, '2025-08-07 00:00:00', 'Admin'),
(8, NULL, 'Botol x2', '2025-08-07 00:00:00', 'Admin'),
(9, NULL, 'Buku Tulis x5', '2025-08-07 00:00:00', 'Admin'),
(10, 'Kopi x200', NULL, '2025-08-07 00:00:00', 'Admin'),
(11, NULL, 'Kopi x10', '2025-08-08 00:00:00', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `pengeluaran`
--

CREATE TABLE `pengeluaran` (
  `id` int(11) NOT NULL,
  `barang_id` int(11) DEFAULT NULL,
  `jumlah` int(11) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `divisi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengeluaran`
--

INSERT INTO `pengeluaran` (`id`, `barang_id`, `jumlah`, `tanggal`, `divisi`) VALUES
(2, 2, 20, '2025-08-02', 'Keuangan'),
(3, 3, 50, '2025-08-03', 'Pendidikan'),
(4, 4, 25, '2025-08-04', 'Pengadaan'),
(5, 5, 40, '2025-08-05', 'Logistik'),
(7, 2, 10, '2025-08-06', 'HR'),
(9, 2, 5, '2025-08-07', 'HR'),
(10, 9, 10, '2025-08-08', 'HR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_history`
--
ALTER TABLE `log_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_id` (`barang_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `log_history`
--
ALTER TABLE `log_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pengeluaran`
--
ALTER TABLE `pengeluaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD CONSTRAINT `pengeluaran_ibfk_1` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
