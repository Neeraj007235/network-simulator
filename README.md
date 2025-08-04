# 📡 Network Traffic Simulator (Telecom Simulation Project)

A simple web-based network traffic simulator for visualizing data packet flow between interconnected nodes (like routers/switches) in a telecom network.  
Built with Node.js (backend) and React.js (frontend).


---

## 🔮 Features

- Simulates a network with 5 nodes (A, B, C, D, E)
- Each node generates data packets based on defined traffic rates
- Packets are routed via the **shortest path**
- Link capacity limits how many packets can pass per second
- Queues form if links are congested
- Real-time network visualization
- Displays:
  - Link usage
  - Node queue lengths
  - Traffic statistics

---

## 🚀 Live Preview

You can view the live preview of the project [here](https://network-simulator-m9ij.onrender.com).

---

## 🧠 Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Data Storage:** In-memory JavaScript objects (no database)
- **Routing Algorithm:** Breadth-First Search (shortest path)

---

## ⚙️ Getting Started

1. **Clone the Repository:**

```bash
git clone https://github.com/Neeraj007235/network-simulator.git
```

2. **Create .env file:**
   Inside the Backend directories create `.env` and set:

   Backend:

   ```bash
   PORT = 5000
   NODE_ENV = development
   ```

3. **Install dependencies:**
   ```bash
   npm install     # Run in both Frontend and Backend directories
   ```

4. **Start the servers:**
   Frontend:
   ```bash
   cd network-simulator-frontend
   npm run dev
   ```
   Backend:
   ```bash
   cd network-simulator-backend
   npm run dev
   ```
5. **Access the application:**
   ```bash
   http://localhost:5173/
   ```