import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ModelChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-4 sm:mx-6 md:mx-8 mt-4 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Top Models</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="model"
            tick={{ fill: '#4B5563', fontSize: 12 }}
            interval={0}
            angle={-30}
            textAnchor="end"
          />
          <YAxis tick={{ fill: '#4B5563', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
            cursor={{ fill: 'rgba(59,130,246,0.1)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelChart;