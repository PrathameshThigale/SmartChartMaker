import React, { useState } from 'react';
import { ChartOptions } from '../types';
import { HexColorPicker } from 'react-colorful';
import { Type, AlignLeft, Circle, Square, Triangle, Star, Hash, PenTool, ListOrdered as BorderAll } from 'lucide-react';

type ChartControlsProps = {
  options: ChartOptions;
  onOptionsChange: (newOptions: ChartOptions) => void;
  chartType: string;
};

const fonts = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Lato', value: 'Lato' }
];

const pointStyles = [
  { name: 'Circle', value: 'circle', icon: Circle },
  { name: 'Square', value: 'rect', icon: Square },
  { name: 'Triangle', value: 'triangle', icon: Triangle },
  { name: 'Star', value: 'star', icon: Star },
  { name: 'Cross', value: 'crossRot', icon: Hash }
];

const ChartControls: React.FC<ChartControlsProps> = ({
  options,
  onOptionsChange,
  chartType
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [note, setNote] = useState('');

  const handleTitleChange = (text: string) => {
    onOptionsChange({
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text,
          font: {
            ...options.plugins.title.font
          }
        }
      }
    });
  };

  const handleFontChange = (fontFamily: string) => {
    onOptionsChange({
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          font: {
            ...options.plugins.title.font,
            family: fontFamily
          }
        },
        legend: {
          ...options.plugins.legend,
          labels: {
            ...options.plugins.legend.labels,
            font: {
              family: fontFamily
            }
          }
        }
      }
    });
  };

  const handleFontSizeChange = (size: string) => {
    onOptionsChange({
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          font: {
            ...options.plugins.title.font,
            size: parseInt(size)
          }
        }
      }
    });
  };

  const handleBorderWidthChange = (width: string) => {
    onOptionsChange({
      ...options,
      elements: {
        ...options.elements,
        line: {
          ...options.elements?.line,
          borderWidth: parseInt(width)
        }
      }
    });
  };

  const handlePointStyleChange = (style: string) => {
    onOptionsChange({
      ...options,
      elements: {
        ...options.elements,
        point: {
          ...options.elements?.point,
          pointStyle: style
        }
      }
    });
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
    onOptionsChange({
      ...options,
      plugins: {
        ...options.plugins,
        annotation: {
          annotations: {
            note1: {
              type: 'label',
              content: newNote,
              position: 'center',
              yAdjust: 100
            }
          }
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${activeTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'style' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('style')}
        >
          Style
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'advanced' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
      </div>

      {activeTab === 'general' && (
        <>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Type size={16} className="mr-2" />
              Chart Title
            </h3>
            <input
              type="text"
              value={options.plugins.title.text}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter chart title"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <AlignLeft size={16} className="mr-2" />
              Add Note
            </h3>
            <textarea
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Add a note to your chart"
              rows={3}
            />
          </div>
        </>
      )}

      {activeTab === 'style' && (
        <>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Font Family</h3>
            <select
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => handleFontChange(e.target.value)}
              value={options.plugins.title.font?.family}
            >
              {fonts.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Font Size</h3>
            <input
              type="range"
              min="12"
              max="32"
              value={options.plugins.title.font?.size || 16}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600">
              {options.plugins.title.font?.size || 16}px
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BorderAll size={16} className="mr-2" />
              Border Width
            </h3>
            <input
              type="range"
              min="1"
              max="10"
              value={options.elements?.line?.borderWidth || 1}
              onChange={(e) => handleBorderWidthChange(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600">
              {options.elements?.line?.borderWidth || 1}px
            </div>
          </div>

          {(chartType === 'line' || chartType === 'scatter') && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <PenTool size={16} className="mr-2" />
                Point Style
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {pointStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => handlePointStyleChange(style.value)}
                    className={`p-2 rounded ${
                      options.elements?.point?.pointStyle === style.value
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50'
                    }`}
                    title={style.name}
                  >
                    <style.icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'advanced' && (
        <>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Legend Position</h3>
            <select
              value={options.plugins.legend.position}
              onChange={(e) => onOptionsChange({
                ...options,
                plugins: {
                  ...options.plugins,
                  legend: {
                    ...options.plugins.legend,
                    position: e.target.value as 'top' | 'bottom' | 'left' | 'right'
                  }
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          {(chartType === 'bar' || chartType === 'line' || chartType === 'horizontalBar') && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Scale Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="px-3 py-2 border rounded-md"
                  onChange={(e) => onOptionsChange({
                    ...options,
                    scales: {
                      ...options.scales,
                      y: {
                        ...options.scales?.y,
                        min: Number(e.target.value)
                      }
                    }
                  })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="px-3 py-2 border rounded-md"
                  onChange={(e) => onOptionsChange({
                    ...options,
                    scales: {
                      ...options.scales,
                      y: {
                        ...options.scales?.y,
                        max: Number(e.target.value)
                      }
                    }
                  })}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChartControls;