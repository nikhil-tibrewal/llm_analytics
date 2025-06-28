import React from "react";

function MetricsCards({ metrics }) {
  const cards = [
    { label: "Total Calls", value: metrics.total_calls, color: "text-blue-600" },
    { label: "Avg Latency (ms)", value: metrics.avg_latency_ms, color: "text-orange-600" },
    { label: "Tokens (Prompt)", value: metrics.total_tokens_prompt, color: "text-purple-600" },
    { label: "Tokens (Completion)", value: metrics.total_tokens_completion, color: "text-purple-600" },
    { label: "Total Tokens", value: metrics.total_tokens, color: "text-indigo-600" },
    { label: "Est. Cost (USD)", value: `$${metrics.estimated_cost_usd}`, color: "text-green-600" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-sm text-gray-500 mb-1">{card.label}</h2>
          <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;