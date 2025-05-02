import { ChartData, ChartOptions, ChartType } from '../types';

export const chartTypes: ChartType[] = [
  { id: 'bar', name: 'Bar Chart', description: 'Compare values across categories' },
  { id: 'line', name: 'Line Chart', description: 'Show trends over a continuous interval' },
  { id: 'pie', name: 'Pie Chart', description: 'Show proportion of parts to a whole' },
  { id: 'doughnut', name: 'Doughnut Chart', description: 'Similar to pie chart with a hole in center' },
  { id: 'polarArea', name: 'Polar Area Chart', description: 'Similar to pie but values are represented by distance from center' },
  { id: 'radar', name: 'Radar Chart', description: 'Display multivariate data on axes from a center point' },
  { id: 'scatter', name: 'Scatter Plot', description: 'Show relationship between two variables' },
  { id: 'bubble', name: 'Bubble Chart', description: 'Like scatter plot with a third dimension shown by size' },
  { id: 'area', name: 'Area Chart', description: 'Line chart with filled area below the line' },
  { id: 'horizontalBar', name: 'Horizontal Bar Chart', description: 'Bar chart with horizontal orientation' },
  { id: 'stacked', name: 'Stacked Bar Chart', description: 'Bar chart with stacked segments' },
  { id: 'grouped', name: 'Grouped Bar Chart', description: 'Bar chart with grouped categories' },
  { id: 'mixed', name: 'Mixed Chart', description: 'Combination of multiple chart types' },
  { id: 'candlestick', name: 'Candlestick Chart', description: 'Show price movements over time' },
  { id: 'heatmap', name: 'Heatmap', description: 'Display data values as colors on a grid' },
  { id: 'gauge', name: 'Gauge Chart', description: 'Display value as a position on a dial' },
  { id: 'funnel', name: 'Funnel Chart', description: 'Show progression through stages of a process' },
];

export const defaultColors = [
  '#36A2EB', // blue
  '#FF6384', // pink
  '#FFCE56', // yellow
  '#4BC0C0', // teal
  '#9966FF', // purple
  '#FF9F40', // orange
  '#C9CBCF', // grey
  '#7BC225', // green
  '#FF5A5E', // red
  '#5D62B5', // dark blue
  '#2ECC71', // emerald
  '#E74C3C', // red
  '#F1C40F', // yellow
  '#9B59B6', // purple
  '#1ABC9C', // turquoise
  '#34495E', // navy
  '#95A5A6', // grey
  '#D35400', // orange
  '#16A085', // green
  '#27AE60', // emerald
];

export const getDefaultChartData = (type: string): ChartData => {
  const defaultData: ChartData = {
    labels: ['Item 1', 'Item 2', 'Item 3'],
    datasets: [{
      label: 'Dataset 1',
      data: [30, 50, 70],
      backgroundColor: defaultColors.slice(0, 3),
      borderColor: defaultColors.slice(0, 3).map(color => darkenColor(color, 0.1)),
      borderWidth: 1
    }]
  };

  switch (type) {
    case 'line':
    case 'area':
      defaultData.datasets[0].fill = type === 'area';
      defaultData.datasets[0].tension = 0.4;
      defaultData.datasets[0].backgroundColor = defaultColors[0];
      defaultData.datasets[0].borderColor = darkenColor(defaultColors[0], 0.1);
      break;
    case 'scatter':
    case 'bubble':
      defaultData.datasets[0].backgroundColor = defaultColors[0];
      defaultData.datasets[0].borderColor = darkenColor(defaultColors[0], 0.1);
      if (type === 'bubble') {
        defaultData.datasets[0].radius = [10, 15, 20];
      }
      break;
    case 'radar':
      defaultData.datasets[0].backgroundColor = addAlpha(defaultColors[0], 0.2);
      defaultData.datasets[0].borderColor = defaultColors[0];
      break;
    case 'polarArea':
      break;
    case 'horizontalBar':
      break;
    case 'candlestick':
      defaultData.datasets[0].backgroundColor = defaultColors[1];
      defaultData.datasets[0].borderColor = darkenColor(defaultColors[1], 0.1);
      break;
    case 'heatmap':
      defaultData.datasets[0].backgroundColor = defaultColors.slice(0, 3);
      break;
    case 'gauge':
      defaultData.datasets[0].data = [70, 30];
      defaultData.datasets[0].backgroundColor = [defaultColors[0], '#E0E0E0'];
      defaultData.datasets[0].borderColor = [darkenColor(defaultColors[0], 0.1), '#D0D0D0'];
      defaultData.labels = ['Value', 'Remaining'];
      break;
    case 'funnel':
      defaultData.datasets[0].backgroundColor = defaultColors[0];
      defaultData.datasets[0].borderColor = darkenColor(defaultColors[0], 0.1);
      break;
  }

  return defaultData;
};

export const getDefaultOptions = (type: string): ChartOptions => {
  const baseOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      title: {
        display: true,
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`
      }
    }
  };

  switch (type) {
    case 'bar':
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    case 'horizontalBar':
      return {
        ...baseOptions,
        indexAxis: 'y',
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: 'Horizontal Bar Chart'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      };
    case 'line':
    case 'area':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: type === 'area' ? 'Area Chart' : 'Line Chart'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    case 'pie':
    case 'doughnut':
    case 'polarArea':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`
          }
        }
      };
    case 'radar':
      return {
        ...baseOptions,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0
          }
        }
      };
    case 'scatter':
    case 'bubble':
      return {
        ...baseOptions,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      };
    case 'candlestick':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: 'Candlestick Chart'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    case 'heatmap':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: 'Heatmap'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    case 'gauge':
      return {
        ...baseOptions,
        circumference: 180,
        rotation: 270,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: 'Gauge Chart'
          }
        }
      };
    case 'funnel':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            ...baseOptions.plugins.title,
            text: 'Funnel Chart'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    default:
      return baseOptions;
  }
};

const darkenColor = (hex: string, amount: number): string => {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.floor((1 - amount) * ((num >> 16) & 255)));
  const g = Math.max(0, Math.floor((1 - amount) * ((num >> 8) & 255)));
  const b = Math.max(0, Math.floor((1 - amount) * (num & 255)));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};

const addAlpha = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};