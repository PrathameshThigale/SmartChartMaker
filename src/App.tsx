import React, { useState } from 'react';
import ChartDisplay from './components/ChartDisplay';
import InputForm from './components/InputForm';
import Header from './components/Header';
import { ChartData, ChartOptions, ChartConfig } from './types';
import { getDefaultChartData, getDefaultOptions } from './utils/chartDefaults';
import { BarController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, DoughnutController, RadarController, BubbleController, ScatterController, LineController } from 'chart.js';
import Chart from 'chart.js/auto';

// Register Chart.js components
Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  RadarController,
  BubbleController,
  ScatterController,
  LineController
);

function App() {
  const [chartType, setChartType] = useState<string>('bar');
  const [chartData, setChartData] = useState<ChartData>(getDefaultChartData('bar'));
  const [chartOptions, setChartOptions] = useState<ChartOptions>(getDefaultOptions('bar'));
  const [inputLabels, setInputLabels] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [inputValues, setInputValues] = useState<number[]>([30, 50, 70]);
  const [backgroundColor, setBackgroundColor] = useState<string[]>(['#36A2EB', '#FF6384', '#FFCE56']);
  const [borderColor, setBorderColor] = useState<string[]>(['#2793DB', '#FF4B75', '#FFB947']);

  const updateChartData = (config: ChartConfig) => {
    const { type, labels, values, bgColors, borderColors } = config;
    
    const newData = {
      labels,
      datasets: [{
        label: 'Dataset 1',
        data: values,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1,
        ...(type === 'bubble' && {
          radius: values.map(v => Math.max(v/5, 4)),
        }),
      }]
    };
    
    setChartData(newData);
    setChartOptions(getDefaultOptions(type));
    setChartType(type);
  };

  const handleInputChange = (labels: string[], values: number[], bgColors: string[], borderColors: string[]) => {
    setInputLabels(labels);
    setInputValues(values);
    setBackgroundColor(bgColors);
    setBorderColor(borderColors);
    
    updateChartData({
      type: chartType,
      labels,
      values,
      bgColors,
      borderColors
    });
  };

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
    
    updateChartData({
      type,
      labels: inputLabels,
      values: inputValues,
      bgColors: backgroundColor,
      borderColors: borderColor
    });
  };

  const handleOptionsChange = (newOptions: ChartOptions) => {
    setChartOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        <InputForm 
          labels={inputLabels}
          values={inputValues} 
          backgroundColors={backgroundColor}
          borderColors={borderColor}
          chartType={chartType}
          onInputChange={handleInputChange}
          onChartTypeChange={handleChartTypeChange}
        />
        <ChartDisplay 
          chartType={chartType} 
          data={chartData} 
          options={chartOptions}
          onOptionsChange={handleOptionsChange}
        />
      </div>
    </div>
  );
}

export default App;