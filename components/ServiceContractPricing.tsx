'use client';

import React, { useState, useMemo } from 'react';
import Icon from './Icon';

interface ContractPricingData {
  model: string;
  code: string;
  yearRange: string;
  engines: {
    type: string;
    pricing: {
      standard: (number | null)[];
      amg: (number | null)[];
      premium: (number | null)[];
      amgPremium: (number | null)[];
    };
  }[];
}

const contractPricingData: ContractPricingData[] = [
  {
    model: 'AMG GT',
    code: '190',
    yearRange: '2014 to 2024',
    engines: [
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [null, 3800], 
          amg: [6100, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'AMG GT',
    code: '192',
    yearRange: '2024 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, 6100], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [null, 6100], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'AMG GT 4-DR',
    code: '290',
    yearRange: '2018 to Present',
    engines: [
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [2900, 3700], 
          amg: [8600, 2900], 
          premium: [3700, 8600], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'A-Class',
    code: '176',
    yearRange: '2012 to 2018',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [16900, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'A-Class',
    code: '177',
    yearRange: '2018 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [11700, 16900], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'B-Class',
    code: '245',
    yearRange: '2005 to 2011',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [10000, 10000], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'B-Class',
    code: '246',
    yearRange: '2011 to 2019',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, 16900], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'B-Class',
    code: '247',
    yearRange: '2019 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '202',
    yearRange: '1993 to 2000',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [2700, 3400], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [2900, 3400], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [2900, 2900], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '203',
    yearRange: '2000 to 2007',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [4500, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '204',
    yearRange: '2007 to 2014',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [null, 3700], 
          amg: [4800, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [4000, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [3800, 4800], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '205',
    yearRange: '2014 to 2021',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [7600, 8800], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [9000, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [9400, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '206',
    yearRange: '2021 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [9400, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '236',
    yearRange: '2024 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [9400, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '6 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [11900, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'CL-Class',
    code: '215',
    yearRange: '1999 to 2006',
    engines: [
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '12 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'CL-Class',
    code: '216',
    yearRange: '2006 to 2014',
    engines: [
      { 
        type: '8 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      },
      { 
        type: '12 Cyl', 
        pricing: { 
          standard: [null, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'CLA-Class',
    code: '117',
    yearRange: '2013 to 2019',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [2900, 3700], 
          amg: [8600, 2900], 
          premium: [3700, 8600], 
          amgPremium: [2900, 3700] 
        } 
      }
    ]
  },
  {
    model: 'CLA-Class',
    code: '118',
    yearRange: '2019 to 2025',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [8600, null], 
          amg: [null, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'CLA-Class',
    code: '178',
    yearRange: '2025 to Present',
    engines: [
      { 
        type: '4 Cyl', 
        pricing: { 
          standard: [10000, 10000], 
          amg: [10000, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  // Electric Vehicles
  {
    model: 'EQA',
    code: 'H243',
    yearRange: '2021 to Present',
    engines: [
      { 
        type: 'ELEC', 
        pricing: { 
          standard: [2900, null], 
          amg: [2900, null], 
          premium: [2900, null], 
          amgPremium: [3300, null] 
        } 
      }
    ]
  },
  {
    model: 'EQB',
    code: 'X243',
    yearRange: '2021 to Present',
    engines: [
      { 
        type: 'ELEC', 
        pricing: { 
          standard: [3300, null], 
          amg: [3300, null], 
          premium: [4100, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'EQC',
    code: 'N293',
    yearRange: '2019 to Present',
    engines: [
      { 
        type: 'ELEC', 
        pricing: { 
          standard: [5800, null], 
          amg: [5800, null], 
          premium: [5800, null], 
          amgPremium: [6600, null] 
        } 
      }
    ]
  },
  {
    model: 'EQE',
    code: 'V295',
    yearRange: '2021 to Present',
    engines: [
      { 
        type: 'ELEC', 
        pricing: { 
          standard: [6600, null], 
          amg: [6600, null], 
          premium: [8600, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  },
  {
    model: 'EQS',
    code: 'V297',
    yearRange: '2021 to Present',
    engines: [
      { 
        type: 'ELEC', 
        pricing: { 
          standard: [2900, null], 
          amg: [5800, null], 
          premium: [null, null], 
          amgPremium: [null, null] 
        } 
      }
    ]
  }
];

export default function ServiceContractPricing() {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  // Get unique model series for dropdown
  const modelSeries = useMemo(() => {
    const series = [...new Set(contractPricingData.map(item => item.model))];
    return series.sort();
  }, []);

  // Get year ranges for selected model
  const availableYears = useMemo(() => {
    if (!selectedModel) return [];
    return contractPricingData.filter(item => item.model === selectedModel);
  }, [selectedModel]);

  // Get engines for selected year
  const availableEngines = useMemo(() => {
    if (!selectedYear) return [];
    const yearData = contractPricingData.find(item => item.model === selectedModel && item.yearRange === selectedYear);
    return yearData ? yearData.engines : [];
  }, [selectedModel, selectedYear]);

  // Get pricing for current selection
  const currentPricing = useMemo(() => {
    if (!selectedModel || !selectedYear || !selectedEngine) return null;
    
    const yearData = contractPricingData.find(item => item.model === selectedModel && item.yearRange === selectedYear);
    if (!yearData) return null;
    
    const engine = yearData.engines.find(e => e.type === selectedEngine);
    return engine ? engine.pricing : null;
  }, [selectedModel, selectedYear, selectedEngine]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear('');
    setSelectedEngine('');
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedEngine('');
  };

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine);
  };

  const formatPrice = (priceArray: (number | null)[]) => {
    const validPrices = priceArray.filter((price): price is number => price !== null && price !== undefined);
    if (validPrices.length === 0) return 'N/A';
    if (validPrices.length === 1) return `AED ${validPrices[0].toLocaleString()}`;
    return `AED ${validPrices[0].toLocaleString()} - ${validPrices[1].toLocaleString()}`;
  };

  return (
    <section className="service-contracts-section">
      <div className="contracts-container">
        <div className="section-header">
          <h2>SERVICE CONTRACT PRICING CALCULATOR</h2>
          <p>Select your Mercedes-Benz model to see transparent contract pricing</p>
        </div>

        <div className="comparison-table">
          <div className="pricing-form">
            {/* Model Selection */}
            <div className="form-group">
              <label className="form-label">Model Series</label>
              <select 
                className="form-select"
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
              >
                <option value="">Select Model Series</option>
                {modelSeries.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Year Selection */}
            {selectedModel && (
              <div className="form-group">
                <label className="form-label">Year Range</label>
                <select 
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">Select Year Range</option>
                  {availableYears.map(year => (
                    <option key={`${year.code}-${year.yearRange}`} value={year.yearRange}>
                      {year.yearRange} ({year.code})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Engine Selection */}
            {selectedYear && (
              <div className="form-group">
                <label className="form-label">Engine Type</label>
                <select 
                  className="form-select"
                  value={selectedEngine}
                  onChange={(e) => handleEngineChange(e.target.value)}
                >
                  <option value="">Select Engine</option>
                  {availableEngines.map(engine => (
                    <option key={engine.type} value={engine.type}>{engine.type}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Pricing Display */}
          {currentPricing && (
            <div className="pricing-result">
              <div className="result-header">
                <h4 className="result-title">
                  {selectedModel} {selectedEngine}
                </h4>
                <p className="result-subtitle">{selectedYear}</p>
              </div>
              
              <div className="contract-pricing-grid">
                <div className="price-card">
                  <div className="price-header">
                    <Icon name="file-contract" size={18} variant="gold" />
                    <span className="price-label">Standard</span>
                  </div>
                  <div className="price-amount">
                    {formatPrice(currentPricing.standard)}
                  </div>
                </div>
                
                <div className="price-card">
                  <div className="price-header">
                    <Icon name="star" size={18} variant="gold" />
                    <span className="price-label">AMG</span>
                  </div>
                  <div className="price-amount">
                    {formatPrice(currentPricing.amg)}
                  </div>
                </div>

                <div className="price-card featured">
                  <div className="price-header">
                    <Icon name="shield-alt" size={18} variant="gold" />
                    <span className="price-label">Premium</span>
                  </div>
                  <div className="price-amount">
                    {formatPrice(currentPricing.premium)}
                  </div>
                </div>

                <div className="price-card featured">
                  <div className="price-header">
                    <Icon name="medal" size={18} variant="gold" />
                    <span className="price-label">AMG Premium</span>
                  </div>
                  <div className="price-amount">
                    {formatPrice(currentPricing.amgPremium)}
                  </div>
                </div>
              </div>

              <div className="pricing-actions">
                <a href="tel:+97143805515" className="btn-primary">
                  <Icon name="phone-alt" size={16} variant="gold" flip={true} />
                  Call Now
                </a>
                <a href="https://wa.me/97143805515" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} variant="gold" />
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 