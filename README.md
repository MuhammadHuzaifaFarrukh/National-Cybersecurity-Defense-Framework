# National Cybersecurity Defense Framework (NCDF) 🛡️

The **National Cybersecurity Defense Framework (NCDF)** is a production-grade database system designed to serve as the data backbone for a national security operations center. Built with **MongoDB** and **Mongoose**, this project demonstrates a highly scalable approach to managing complex cybersecurity data, including real-time alerts, incident tracking, and network event logging.

---

## 🚀 Key Features

### 1. Document-Oriented Architecture
Utilizes MongoDB's BSON format to handle dynamic cybersecurity data structures (logs, packet headers, and forensic notes) without the rigidity of traditional SQL tables.

### 2. Comprehensive Security Ecosystem
The database consists of **13 interconnected collections** covering the full operational surface of a defense framework:
* **Core Ops:** `Incidents`, `SecurityAlerts`, `NetworkEvents`.
* **Infrastructure:** `Assets`, `Vulnerabilities`, `ThreatIntelligence`.
* **Administration:** `Users`, `AccessLogs`, `AuditTrails`.
* **Personnel:** `TrainingModules`, `TrainingRecords`, `Certifications`.

### 3. Advanced Querying & Aggregation
* **Complex Pipelines:** Implements multi-stage aggregations for real-time dashboarding, such as severity distribution and analyst performance metrics.
* **CRUD Operations:** Robust Create, Read, Update, and Delete operations for all security entities.

### 4. Optimized Performance
* **Indexing Strategy:** Custom Single-field, Compound, and TTL indexes are implemented to ensure sub-second query responses.
* **Schema Design:** Strategic use of **Embedding** (for high-read performance) and **Referencing** (for data integrity).

### 5. Cloud Infrastructure
* **Deployment:** Hosted on **MongoDB Atlas** (Cluster0) for high availability and production-grade reliability.
* **Security:** Implements IP Whitelisting and SCRAM authentication to protect sensitive national defense data.

---

## 🛠️ Tech Stack
* **Database:** MongoDB (Atlas Cloud)
* **ODM:** Mongoose
* **Runtime:** Node.js
* **Environment:** Kali Linux / Windows

---

## 📂 Database Schema Overview

| Collection | Description | Primary Key |
| :--- | :--- | :--- |
| `Users` | System users (Admins, Analysts, Responders) | `user_id` |
| `Incidents` | Detailed tracking of security breaches | `incident_id` |
| `SecurityAlerts` | Automated triggers from monitoring tools | `alert_id` |
| `NetworkEvents` | Raw logs of network traffic/packets | `event_id` |
| `ThreatIntelligence`| Known malicious IPs and signatures | `intel_id` |

---

## 🚦 Getting Started

### Prerequisites
* Node.js installed
* A MongoDB Atlas account or local MongoDB instance

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/NCDF-Database-Framework.git](https://github.com/your-username/NCDF-Database-Framework.git)
   cd NCDF-Database-Framework
2. **Install dependencies:**
   ```bash
   npm install
4. **Configure environment variables:**
   ```bash
   MONGODB_URI=your_mongodb_atlas_connection_string PORT=3000
5. **Seed the Database:**
   ```bash
   node scripts/seed-data.js

📊 Sample Aggregation
Example of a pipeline used to generate a Severity Distribution Report:
  
db.incidents.aggregate([
  { $match: { status: "open" } },
  { $group: { _id: "$severity", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);


## 👥 Contributors
Our team consists of dedicated students from the **University of the Punjab (PUCIT)**, working together to build a robust defense framework.

| Name | Role |
| :--- | :--- | :--- |
| **[M. Huzaifa Farrukh](https://github.com/MuhammadHuzaifaFarrukh)** | Database Architect & Cloud Lead |
| **[Hammad Ashfaq](https://github.com/hammad-x25)** | Backend Developer & Schema Designer |
| **[Huzayfa Siddique](https://github.com/huzayfaSiddique)** | Security Analyst & Data Modeler |

---

📜 License
This project was developed for the Advanced Database Management System course at the University of the Punjab (PUCIT).
