// React Hook Imports
// import * as React from 'react';
import React, { useState } from "react";
import { Chart } from "chart.js/auto";

// MUI Material Imports
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from "../../utils/auth";

// CSS Imports
import classes from "./searchbar.module.css";

const SearchBar = () => {
  const [symbol, setSymbol] = useState("");
  const [chart, setChart] = useState<Chart | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/stock/${symbol}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      console.log(response);
      const stockData = await response.json();

      console.log(stockData);

      const ctx = (
        document.getElementById("stockChart") as HTMLCanvasElement
      ).getContext("2d");

      if (chart) {
        chart.destroy();
      }

      const newChart = new Chart(ctx!, {
        type: "line",
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#000000",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "#000000",
              },
              ticks: {
                color: "#000000",
              },
            },
            y: {
              grid: {
                color: "rgba(0, 0, 0, .5)",
              },
              ticks: {
                color: "#000000",
              },
            },
          },
        },
        data: {
          labels: stockData.labels,
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: stockData.values,
              backgroundColor: "#26A96C",
              borderColor: "#26A96C",
              borderWidth: 3,
            },
          ],
        },
      });

      // window.addEventListener('beforeprint', () => {
      //     newChart.resize(100, 100);
      // });
      // window.addEventListener('afterprint', () => {
      //     newChart.resize();
      // });

      setChart(newChart);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const searchTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#6D696A",
      },
      success: {
        main: "#26A96C",
      },
      info: {
        main: "#EAEAEA",
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 362,
        md: 768,
        lg: 1024,
        xl: 1440,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={searchTheme}>
        <Grid container direction="row" spacing={2}>
          <Grid size={12} display="flex" justifyContent="center">
            <Box
              sx={{
                width: "750px",
                maxWidth: "100%",
                margin: "15px",
                marginTop: 15,
              }}
            >
              <form
                className={`${classes.searchInput}`}
                id="stockForm"
                onSubmit={handleSubmit}
              >
                <input
                  className={`${classes.searchText}`}
                  type="text"
                  id="symbolInput"
                  placeholder="Enter stock symbol (e.g., AAPL)"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                />
                <Button
                  className={`${classes.searchButton}`}
                  variant="contained"
                  type="submit"
                >
                  Search
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SearchBar;
