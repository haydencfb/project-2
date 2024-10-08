import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import { Typography } from "@mui/material";

const Charts: React.FC = () => {
  const [symbol, setSymbol] = useState("");
  const [chart, setChart] = useState<Chart | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/stock/${symbol}`);
      const stockData = await response.json();
      // const stockPrice = stockData.price.regularMarketPrice.raw;

      console.log(stockData);

      const ctx = (
        document.getElementById("stockChart") as HTMLCanvasElement
      ).getContext("2d");

      if (chart) {
        chart.destroy();
      }

      const newChart = new Chart(ctx!, {
        type: "line",
        data: {
          labels: [stockData.labels],
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: [stockData.prices],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChart(newChart);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <>
      <div>
        <canvas id="stockChart" width="400" height="300px"></canvas>
      </div>
    </>
  );
};

export default Charts;
