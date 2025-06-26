import React from "react";

function MetricsCards({ metrics }) {
  const cards = [
    { label: "Total Calls", value: metrics.total_calls },
    { label: "Avg Latency (ms)", value: metrics.avg_latency_ms },
    { label: "Tokens (Prompt)", value: metrics.total_tokens_prompt },
    { label: "Tokens (Completion)", value: metrics.total_tokens_completion },
    { label: "Total Tokens", value: metrics.total_tokens },
    { label: "Est. Cost (USD)", value: `$${metrics.estimated_cost_usd}` }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="p-4 border rounded-lg shadow">
          <h2 className="text-sm text-gray-500">{card.label}</h2>
          <p className="text-lg font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;