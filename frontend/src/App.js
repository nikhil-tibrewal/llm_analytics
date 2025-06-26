import React, { useEffect, useState } from "react";
import axios from "axios";
import MetricsCards from "./components/MetricsCards";
import ModelChart from "./components/ModelChart";

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/metrics")
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error("Failed to load metrics:", err));
  }, []);

  if (!metrics) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">LLM Usage Dashboard</h1>
      <MetricsCards metrics={metrics} />
      <ModelChart data={metrics.top_models} />
    </div>
  );
}

export default App;