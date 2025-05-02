import React, { useRef, useState } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar, Scatter, Bubble } from 'react-chartjs-2';
import { ChartData, ChartOptions } from '../types';
import { Download, Settings2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import ChartControls from './ChartControls';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

type ChartDisplayProps = {
  chartType: string;
  data: ChartData;
  options: ChartOptions;
  onOptionsChange: (newOptions: ChartOptions) => void;
};

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  chartType, 
  data, 
  options, 
  onOptionsChange 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  const downloadChart = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `chart-${chartType}-${new Date().toISOString().slice(0, 10)}.png`);
        }
      });
    } catch (error) {
      console.error('Error generating chart image:', error);
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'horizontalBar':
        return <Bar data={data} options={{ ...options, indexAxis: 'y' }} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'area':
        const areaData = {
          ...data,
          datasets: data.datasets.map(dataset => ({
            ...dataset,
            fill: true
          }))
        };
        return <Line data={areaData} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      case 'radar':
        return <Radar data={data} options={options} />;
      case 'scatter':
        return <Scatter data={data} options={options} />;
      case 'bubble':
        return <Bubble data={data} options={options} />;
      case 'gauge':
        return <Doughnut data={data} options={{ ...options, circumference: 180, rotation: 270 }} />;
      case 'candlestick':
      case 'heatmap':
      case 'funnel':
      default:
        return (
          <div>
            <Bar data={data} options={options} />
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
              <p className="text-sm">
                Note: {chartType} chart is approximated using a basic chart type. For a production app, specialized chart libraries would be used.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {options.plugins?.title?.text || 'Chart Preview'}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowControls(!showControls)}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          >
            <Settings2 size={16} className="mr-2" />
            Controls
          </button>
          <button 
            onClick={downloadChart}
            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <Download size={16} className="mr-2" />
            Download
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div ref={chartRef} className="flex-grow min-h-[400px] relative">
          {renderChart()}
        </div>
        
        {showControls && (
          <div className="lg:w-64 p-4 bg-gray-50 rounded-lg">
            <ChartControls 
              options={options} 
              onOptionsChange={onOptionsChange}
              chartType={chartType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartDisplay;