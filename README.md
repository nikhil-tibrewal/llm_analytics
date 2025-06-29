# LLM Usage Analytics Dashboard

This project provides an end-to-end system to log, store, and visualize LLM (Large Language Model) usage metrics. It enables developers to track API usage, latency, token consumption, and cost estimation by model, all visualized through a React dashboard.

---

## 🛠 Tech Stack

- **Frontend**: React, TailwindCSS, Recharts
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Database**: PostgreSQL
- **Deployment**: GCP VM, tmux
- **Monitoring**: Custom metrics REST endpoint

---

## 🧱 Architecture Diagram

```mermaid
graph TD
    A[Clients / Apps] -->|POST /log| B[FastAPI Backend]
    B -->|SQL INSERT| C[PostgreSQL DB]
    C -->|Aggregated Data| B
    D[React Dashboard] -->|GET /metrics| B
```

---

## 🔍 Component Descriptions

- **Backend (FastAPI)**: Receives log data via a POST `/log` endpoint, exposes metrics via GET `/metrics` endpoint, and stores data in PostgreSQL.
- **PostgreSQL**: Stores usage logs including latency, token usage, and model details.
- **Frontend (React)**: Fetches metrics from backend and displays them in styled cards and charts using Tailwind and Recharts.

---

## ⚙️ Setup Instructions

### 1. GCP VM Setup

1. **Create a new VM instance** with the following configuration:
  - **Machine type**: e2-standard-2
  - **Boot disk**: Ubuntu LTS 22
  - **Allow HTTP/HTTPS traffic**
  - **Disk Size**: 30GB
  - **Firewall Rule**:
    - Go to VPC Network → Firewall → Create Firewall Rule
    - Name: allow-llm
    - Targets: All instances in the network
    - Source IP ranges: 0.0.0.0/0
    - Protocols and ports: check TCP and add 3000, 8000
    - Save
2. SSH into the VM

```bash
sudo apt update && sudo apt install -y git tmux python3-pip postgresql npm nodejs
```

- (Optional) Install nvm + set Node 20 as default. I used Node v20.19.3 to do this project.

---

### 2. Set Up PostgreSQL

```bash
# Fire up PostgreSQL CLI
sudo -u postgres psql

# Show current databases.
\l

# Create a DB user with password.
CREATE USER llm_user WITH PASSWORD 'llm_pass';

# Create the llm_usage DB, and make our new `llm_user` the owner.
CREATE DATABASE llm_usage OWNER llm_usage;

# Quit the CLI
\q
```

---

### 3. Set Up FastAPI Backend

Run the following in a new tmux session.

```bash
git clone https://github.com/nikhil-tibrewal/llm_analytics.git
cd llm_analytics/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Make sure `DATABASE_URL` is set in `.env`:

```
DATABASE_URL=postgresql://llm_user:llm_pass@localhost:5432/llm_usage
```

---

### 4. Set Up Frontend

Run the following in a new tmux session.

```bash
cd ../frontend
nvm use 20   # or node -v to verify
npm install
```

Build the frontend:

```bash
npm run build
```

---

### 5. Start All Services

Use tmux:

```bash
tmux new -s backend
cd llm_analytics/backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Press Ctrl+B then D to detach

tmux new -s frontend
cd ../frontend
npm start -- --host 0.0.0.0
# Press Ctrl+B then D to detach
```

PostgreSQL runs in background via system service.

---

### 6. Make Requests to Backend

Visit `http://<EXTERNAL_IP>:8000/docs` to test.

Sample POST request to `/log`:

```json
{
  "user_id": "abc123",
  "prompt": "What's the weather?",
  "response": "It's sunny.",
  "model": "gpt-4",
  "latency_ms": 1212,
  "tokens_prompt": 10000,
  "tokens_completion": 1500
}
```

---

### 7. View Metrics Dashboard

Open in browser:

```
http://<EXTERNAL_IP>:3000
```

You’ll see live metrics with cards and a bar chart for top models.

---

Happy monitoring! 📊
