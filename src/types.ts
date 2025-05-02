export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    radius?: number[];
    tension?: number;
    fill?: boolean;
    [key: string]: any;
  }[];
};

export type ChartOptions = {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right';
      display: boolean;
    };
    title: {
      display: boolean;
      text: string;
    };
  };
  scales?: {
    [key: string]: any;
  };
  elements?: {
    [key: string]: any;
  };
  [key: string]: any;
};

export type ChartConfig = {
  type: string;
  labels: string[];
  values: number[];
  bgColors: string[];
  borderColors: string[];
};

export type ChartType = {
  id: string;
  name: string;
  description: string;
};