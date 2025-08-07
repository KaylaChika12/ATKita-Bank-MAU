-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2025 at 05:49 PM
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
(2, 'Buku Tulis', 55, 'Lembar'),
(3, 'Pulpen', 190, 'Biji'),
(4, 'Penghapus', 150, 'Biji'),
(5, 'Rautan', 75, 'Biji'),
(9, 'Kopi', 70, 'pcs'),
(15, 'Meja', 10, 'pcs');

-- --------------------------------------------------------

--
-- Table structure for table `log_history`
--

CREATE TABLE `log_history` (
  `id` int(11) NOT NULL,
  `barang_masuk` text DEFAULT NULL,
  `barang_keluar` text DEFAULT NULL,
  `waktu_transaksi` datetime DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pengeluaran_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_history`
--

INSERT INTO `log_history` (`id`, `barang_masuk`, `barang_keluar`, `waktu_transaksi`, `user`, `pengeluaran_id`) VALUES
(1, 'Pensil x30', 'Pensil x10', '2025-08-01 09:00:00', 'Admin', NULL),
(2, 'Buku Tulis x20', 'Buku Tulis x5', '2025-08-02 10:00:00', 'Admin', NULL),
(3, 'Pulpen x50', 'Pulpen x20', '2025-08-03 11:00:00', 'Admin', NULL),
(4, 'Penghapus x25', 'Penghapus x10', '2025-08-04 14:00:00', 'Admin', NULL),
(5, 'Rautan x40', 'Rautan x15', '2025-08-05 16:00:00', 'Admin', NULL),
(6, NULL, '2 x10', '2025-08-06 00:00:00', 'Admin', NULL),
(7, 'Botol x10', NULL, '2025-08-07 00:00:00', 'Admin', NULL),
(8, NULL, 'Botol x2', '2025-08-07 00:00:00', 'Admin', NULL),
(9, NULL, 'Buku Tulis x5', '2025-08-07 00:00:00', 'Admin', NULL),
(10, 'Kopi x200', NULL, '2025-08-07 00:00:00', 'Admin', NULL),
(11, NULL, 'Kopi x10', '2025-08-08 00:00:00', 'Admin', NULL),
(12, 'Buku Tulis x40', NULL, '2025-08-07 00:00:00', 'Admin', NULL),
(13, 'Buku Tulis x55', NULL, '2025-08-07 00:00:00', 'Admin', NULL),
(16, 'tes x10', NULL, '0000-00-00 00:00:00', 'Admin', NULL),
(17, 'kiw x10', NULL, '2025-07-08 10:17:46', 'Admin', NULL),
(18, 'wow x10', NULL, '2025-07-08 10:19:23', 'Admin', NULL),
(19, 'tes x10', NULL, '2025-07-08 17:20:13', 'Admin', NULL),
(20, 'Kopi x200', NULL, '2025-07-08 17:22:28', 'Admin', NULL),
(21, NULL, 'Kopi x90', '2025-08-07 00:00:00', 'Admin', NULL),
(22, NULL, 'Kopi x10', '2025-08-07 07:00:00', 'Admin', NULL),
(23, NULL, 'Kopi x10', '2025-08-07 07:00:00', 'Admin', NULL),
(24, NULL, 'Kopi x10', '2025-08-07 17:33:00', 'Admin', NULL),
(25, NULL, 'Kopi x10', '2025-08-07 22:44:00', 'Admin', 15),
(26, NULL, 'Pulpen x10', '2025-08-07 22:45:00', 'Admin', 16),
(27, 'Meja x10', NULL, '2025-07-08 22:46:15', 'Admin', NULL);

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
(10, 9, 10, '2025-08-08', 'HR'),
(11, 9, 90, '2025-08-07', 'HR'),
(12, 9, 10, '2025-08-07', 'HR'),
(13, 9, 10, '2025-08-07', 'HR'),
(14, 9, 10, '2025-08-07', 'HR'),
(15, 9, 10, '2025-08-07', 'HR'),
(16, 3, 10, '2025-08-07', 'Korlap');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pengeluaran_log` (`pengeluaran_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `log_history`
--
ALTER TABLE `log_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pengeluaran`
--
ALTER TABLE `pengeluaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log_history`
--
ALTER TABLE `log_history`
  ADD CONSTRAINT `fk_pengeluaran_log` FOREIGN KEY (`pengeluaran_id`) REFERENCES `pengeluaran` (`id`);

--
-- Constraints for table `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD CONSTRAINT `pengeluaran_ibfk_1` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
