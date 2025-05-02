import React, { useState } from 'react';
import { chartTypes, defaultColors } from '../utils/chartDefaults';
import { HexColorPicker } from 'react-colorful';
import { Settings, ChevronDown, ChevronUp, Trash2, Plus } from 'lucide-react';

type InputFormProps = {
  labels: string[];
  values: number[];
  backgroundColors: string[];
  borderColors: string[];
  chartType: string;
  onInputChange: (labels: string[], values: number[], bgColors: string[], borderColors: string[]) => void;
  onChartTypeChange: (type: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({
  labels,
  values,
  backgroundColors,
  borderColors,
  chartType,
  onInputChange,
  onChartTypeChange
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [colorEditMode, setColorEditMode] = useState<'background' | 'border'>('background');

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    onInputChange(newLabels, values, backgroundColors, borderColors);
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = Number(value) || 0;
    onInputChange(labels, newValues, backgroundColors, borderColors);
  };

  const handleColorChange = (color: string) => {
    if (activeColorIndex === null) return;
    
    if (colorEditMode === 'background') {
      const newColors = [...backgroundColors];
      newColors[activeColorIndex] = color;
      onInputChange(labels, values, newColors, borderColors);
    } else {
      const newBorderColors = [...borderColors];
      newBorderColors[activeColorIndex] = color;
      onInputChange(labels, values, backgroundColors, newBorderColors);
    }
  };

  const addDataPoint = () => {
    if (labels.length >= 10) return; // Max 10 inputs as specified

    const newLabels = [...labels, `Item ${labels.length + 1}`];
    const newValues = [...values, 50]; // Default value
    const newBgColors = [...backgroundColors, defaultColors[labels.length % defaultColors.length]];
    const newBorderColors = [...borderColors, defaultColors[labels.length % defaultColors.length]];
    
    onInputChange(newLabels, newValues, newBgColors, newBorderColors);
  };

  const removeDataPoint = (index: number) => {
    if (labels.length <= 1) return; // Keep at least one data point

    const newLabels = labels.filter((_, i) => i !== index);
    const newValues = values.filter((_, i) => i !== index);
    const newBgColors = backgroundColors.filter((_, i) => i !== index);
    const newBorderColors = borderColors.filter((_, i) => i !== index);
    
    onInputChange(newLabels, newValues, newBgColors, newBorderColors);
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-4 md:sticky md:top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
        <select
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value)}
        >
          {chartTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          {chartTypes.find(t => t.id === chartType)?.description || ''}
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-700">Data Points</h3>
          <button
            onClick={addDataPoint}
            disabled={labels.length >= 10}
            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
          >
            <Plus size={16} className="mr-1" />
            Add
          </button>
        </div>
        
        <div className="space-y-4">
          {labels.map((label, index) => (
            <div key={index} className="p-3 border rounded-md shadow-sm bg-gray-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Data Point {index + 1}</h4>
                <button 
                  onClick={() => removeDataPoint(index)}
                  disabled={labels.length <= 1}
                  className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="number"
                    value={values[index]}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <div 
                      className="h-8 w-8 rounded-md shadow-sm cursor-pointer border border-gray-300"
                      style={{ backgroundColor: backgroundColors[index] }}
                      onClick={() => {
                        setActiveColorIndex(index);
                        setColorEditMode('background');
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
                    <div 
                      className="h-8 w-8 rounded-md shadow-sm cursor-pointer border border-gray-300"
                      style={{ backgroundColor: borderColors[index] }}
                      onClick={() => {
                        setActiveColorIndex(index);
                        setColorEditMode('border');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={18} className="mr-2" />
          {showSettings ? 'Hide' : 'Show'} Advanced Settings
          {showSettings ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
        </button>
      </div>

      {showSettings && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Advanced Settings</h3>
          <p className="text-sm text-gray-500 mb-4">More settings coming soon!</p>
        </div>
      )}

      {activeColorIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setActiveColorIndex(null)}>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-medium mb-4">
              Pick a {colorEditMode === 'background' ? 'Fill' : 'Border'} Color
            </h3>
            <HexColorPicker 
              color={colorEditMode === 'background' ? backgroundColors[activeColorIndex] : borderColors[activeColorIndex]} 
              onChange={handleColorChange}
              className="w-full mb-4"
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setActiveColorIndex(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Apply color and close
                  setActiveColorIndex(null);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;