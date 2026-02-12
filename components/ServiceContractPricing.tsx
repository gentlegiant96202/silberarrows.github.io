'use client';

import React, { useState, useMemo } from 'react';
import Icon from './Icon';
import ContactFormModal from './ContactFormModal';

interface ContractPricingData {
  model: string;
  code: string;
  yearRange: string;
  engines: {
    type: string;
    pricing: {
      standard2Year: number | null;
      amg2Year: number | null;
      premium4Year: number | null;
      amg4Year: number | null;
    };
  }[];
}

const contractPricingData: ContractPricingData[] = [
  // AMG GT
  {
    model: 'AMG GT',
    code: '190',
    yearRange: '2014 to 2024',
    engines: [
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: 6100,
          premium4Year: null,
          amg4Year: 16900
        }
      },
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: 6100,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  // AMG GT 4-DR
  {
    model: 'AMG GT 4-DR',
    code: '290',
    yearRange: '2018 to Present',
    engines: [
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 11700
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 16900
        }
      }
    ]
  },
  // A Class
  {
    model: 'A',
    code: '176',
    yearRange: '2012 to 2018',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'A',
    code: '177',
    yearRange: '2018 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 10000
        }
      }
    ]
  },
  // B Class
  {
    model: 'B',
    code: '245',
    yearRange: '2005 to 2011',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'B',
    code: '246',
    yearRange: '2011 to 2019',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'B',
    code: '247',
    yearRange: '2019 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  // C/CLC/CLE Class
  {
    model: 'C/CLC/CLE',
    code: '202',
    yearRange: '1993 to 2000',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'C/CLC/CLE',
    code: '203',
    yearRange: '2000 to 2007',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: 7400,
          amg4Year: 8400
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: 4200,
          premium4Year: 9400,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'C/CLC/CLE',
    code: '204',
    yearRange: '2007 to 2014',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 4200,
          premium4Year: 9400,
          amg4Year: 12600
        }
      }
    ]
  },
  {
    model: 'C/CLC/CLE',
    code: '205',
    yearRange: '2014 to 2021',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 4200,
          premium4Year: 9400,
          amg4Year: 12600
        }
      }
    ]
  },
  {
    model: 'C/CLC/CLE',
    code: '206',
    yearRange: '2021 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'C/CLC/CLE',
    code: '236',
    yearRange: '2024 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  // CL Class
  {
    model: 'CL',
    code: '215',
    yearRange: '1999 to 2006',
    engines: [
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '12 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'CL',
    code: '216',
    yearRange: '2006 to 2014',
    engines: [
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '12 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  // CLA Class
  {
    model: 'CLA',
    code: '117',
    yearRange: '2013 to 2019',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 10000
        }
      }
    ]
  },
  {
    model: 'CLA',
    code: '118',
    yearRange: '2019 to 2025',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 10000
        }
      }
    ]
  },
  {
    model: 'CLA',
    code: '178',
    yearRange: '2025 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: 2900,
          amg2Year: 3700,
          premium4Year: 8600,
          amg4Year: 10000
        }
      }
    ]
  },
  // CLK Class  
  {
    model: 'CLK',
    code: '208',
    yearRange: '1998 to 2003',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'CLK',
    code: '209',
    yearRange: '2003 to 2009',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  // CLS Class
  {
    model: 'CLS',
    code: '219',
    yearRange: '2005 to 2011',
    engines: [
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'CLS',
    code: '218',
    yearRange: '2011 to 2018',
    engines: [
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '8 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  },
  {
    model: 'CLS',
    code: '257',
    yearRange: '2018 to Present',
    engines: [
      {
        type: '4 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      },
      {
        type: '6 Cyl',
        pricing: {
          standard2Year: null,
          amg2Year: null,
          premium4Year: null,
          amg4Year: null
        }
      }
    ]
  }
];

const formatPrice = (price: number | null): string => {
  if (price === null) return 'N/A';
  return `AED ${price.toLocaleString()}`;
};

export default function ServiceContractPricing() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Get unique models
  const availableModels = useMemo(() => {
    return [...new Set(contractPricingData.map(item => item.model))].sort();
  }, []);

  // Get available years for selected model
  const availableYears = useMemo(() => {
    if (!selectedModel) return [];
    return contractPricingData
      .filter(item => item.model === selectedModel)
      .map(item => ({ code: item.code, yearRange: item.yearRange }))
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [selectedModel]);

  // Get available engines for selected model and year
  const availableEngines = useMemo(() => {
    if (!selectedModel || !selectedYear) return [];
    const selectedData = contractPricingData.find(
      item => item.model === selectedModel && item.yearRange === selectedYear
    );
    return selectedData ? selectedData.engines.map(engine => engine.type) : [];
  }, [selectedModel, selectedYear]);

  // Get current pricing
  const currentPricing = useMemo(() => {
    if (!selectedModel || !selectedYear || !selectedEngine) return null;
    
    const selectedData = contractPricingData.find(
      item => item.model === selectedModel && item.yearRange === selectedYear
    );
    
    if (!selectedData) return null;
    
    const engineData = selectedData.engines.find(engine => engine.type === selectedEngine);
    return engineData ? engineData.pricing : null;
  }, [selectedModel, selectedYear, selectedEngine]);

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedYear('');
    setSelectedEngine('');
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setSelectedEngine('');
  };

  const handleEngineChange = (value: string) => {
    setSelectedEngine(value);
  };

  return (
    <section className="service-contracts-section">
      <div className="contracts-container">
        <div className="comparison-table">
          <div className="pricing-section">
            <div className="section-header">
              <h2 className="section-title">Service Contract Pricing Calculator</h2>
              <p className="section-subtitle">
                Get instant pricing for your Mercedes-Benz service contract
              </p>
            </div>

            <div className="pricing-form">
              <div className="form-group">
                <label className="form-label">Model Series</label>
                <select
                  className="form-select"
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                >
                  <option value="">Select Model</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {selectedModel && (
                <div className="form-group">
                  <label className="form-label">Year Range</label>
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                  >
                    <option value="">Select Year Range</option>
                    {availableYears.map((year) => (
                      <option key={year.code} value={year.yearRange}>
                        {year.yearRange} ({year.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedYear && (
                <div className="form-group">
                  <label className="form-label">Engine Type</label>
                  <select
                    className="form-select"
                    value={selectedEngine}
                    onChange={(e) => handleEngineChange(e.target.value)}
                  >
                    <option value="">Select Engine Type</option>
                    {availableEngines.map((engine) => (
                      <option key={engine} value={engine}>
                        {engine}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {currentPricing && (
              <div className="pricing-result">
                <div className="result-header">
                  <h3 className="result-title">
                    {selectedModel} {selectedEngine}
                  </h3>
                  <p className="result-subtitle">{selectedYear}</p>
                </div>

                <div className="contract-pricing-grid">
                  {/* Standard 2 Years */}
                  <div className="price-card">
                    <div className="price-header">
                      <Icon name="file-contract" size={18} variant="gold" />
                      <span className="price-label">Standard 2 Years</span>
                    </div>
                    <div className="price-amount">
                      {formatPrice(currentPricing.standard2Year)}
                    </div>
                  </div>

                  {/* AMG 2 Years */}
                  <div className="price-card">
                    <div className="price-header">
                      <Icon name="star" size={18} variant="gold" />
                      <span className="price-label">AMG 2 Years</span>
                    </div>
                    <div className="price-amount">
                      {formatPrice(currentPricing.amg2Year)}
                    </div>
                  </div>

                  {/* Premium 4 Years */}
                  <div className={`price-card${currentPricing.premium4Year ? ' featured' : ''}`}>
                    <div className="price-header">
                      <Icon name="shield-alt" size={18} variant="gold" />
                      <span className="price-label">Premium 4 Years</span>
                    </div>
                    <div className="price-amount">
                      {formatPrice(currentPricing.premium4Year)}
                    </div>
                  </div>

                  {/* AMG 4 Years */}
                  <div className={`price-card${currentPricing.amg4Year ? ' featured' : ''}`}>
                    <div className="price-header">
                      <Icon name="medal" size={18} variant="gold" />
                      <span className="price-label">AMG 4 Years</span>
                    </div>
                    <div className="price-amount">
                      {formatPrice(currentPricing.amg4Year)}
                    </div>
                  </div>
                </div>

                <div className="pricing-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <Icon name="phone-alt" size={16} variant="dark" flip={true} />
                    Call or WhatsApp Us
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
} 