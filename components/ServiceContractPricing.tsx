'use client';

import React, { useState, useMemo } from 'react';
import Icon from './Icon';

interface ContractPricingData {
  model: string;
  code: string;
  yearRange: string;
  engines: {
    type: string;
    standard: {
      twoYear: number | null;
      fourYear: number | null;
    };
    amg?: {
      twoYear: number | null;
      fourYear: number | null;
    };
  }[];
}

const contractPricingData: ContractPricingData[] = [
  {
    model: 'AMG GT',
    code: '190',
    yearRange: '2014 to 2024',
    engines: [
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'AMG GT',
    code: '192',
    yearRange: '2024 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1188, fourYear: 1620 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'AMG GT 4-DR',
    code: '290',
    yearRange: '2018 to Present',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 960, fourYear: 1620 }, amg: { twoYear: 960, fourYear: 1620 } },
      { type: '8 Cyl', standard: { twoYear: 960, fourYear: 1620 } }
    ]
  },
  {
    model: 'A-Class',
    code: '176',
    yearRange: '2012 to 2018',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'A-Class',
    code: '177',
    yearRange: '2018 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'B-Class',
    code: '245',
    yearRange: '2005 to 2011',
    engines: [
      { type: '4 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'B-Class',
    code: '246',
    yearRange: '2011 to 2019',
    engines: [
      { type: '4 Cyl', standard: { twoYear: null, fourYear: 1986 } }
    ]
  },
  {
    model: 'B-Class',
    code: '247',
    yearRange: '2019 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1770, fourYear: 1950 } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '202',
    yearRange: '1993 to 2000',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1830, fourYear: null } },
      { type: '6 Cyl', standard: { twoYear: 1590, fourYear: 2070 } },
      { type: '8 Cyl', standard: { twoYear: 1740, fourYear: null } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '203',
    yearRange: '2000 to 2007',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1590, fourYear: 2070 } },
      { type: '6 Cyl', standard: { twoYear: null, fourYear: null } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: 2790 } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '204',
    yearRange: '2007 to 2014',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1620 }, amg: { twoYear: null, fourYear: 1986 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1836 }, amg: { twoYear: 1770, fourYear: 2418 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: 1830, fourYear: 2670 } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '205',
    yearRange: '2014 to 2021',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } },
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 1920 }, amg: { twoYear: 1740, fourYear: 2220 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '206',
    yearRange: '2021 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'C-Class/CLC/CLE',
    code: '236',
    yearRange: '2024 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: null, fourYear: null } },
      { type: '6 Cyl', standard: { twoYear: 1590, fourYear: 2790 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'CL-Class',
    code: '215',
    yearRange: '1999 to 2006',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1188, fourYear: 1404 } },
      { type: '12 Cyl', standard: { twoYear: 1590, fourYear: 1590 } }
    ]
  },
  {
    model: 'CL-Class',
    code: '216',
    yearRange: '2006 to 2014',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 2418, fourYear: 2634 } },
      { type: '12 Cyl', standard: { twoYear: 2910, fourYear: 2910 } }
    ]
  },
  {
    model: 'CLA-Class',
    code: '117',
    yearRange: '2013 to 2019',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'CLA-Class',
    code: '118',
    yearRange: '2019 to 2025',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'CLA-Class',
    code: '178',
    yearRange: '2025 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'CLK-Class',
    code: '208',
    yearRange: '1998 to 2003',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1836 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 2052 } },
      { type: '8 Cyl', standard: { twoYear: 1512, fourYear: 2376 } }
    ]
  },
  {
    model: 'CLK-Class',
    code: '209',
    yearRange: '2003 to 2009',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1080, fourYear: 1620 } },
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1836 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1944 } }
    ]
  },
  {
    model: 'CLS-Class',
    code: '219',
    yearRange: '2005 to 2011',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1620 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1728 } }
    ]
  },
  {
    model: 'CLS-Class',
    code: '218',
    yearRange: '2011 to 2018',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 1800 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 1920 } }
    ]
  },
  {
    model: 'CLS-Class',
    code: '257',
    yearRange: '2018 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 } },
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 1800 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '124',
    yearRange: '1984 to 1997',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1836 } },
      { type: '6 Cyl', standard: { twoYear: 972, fourYear: 1836 } },
      { type: '8 Cyl', standard: { twoYear: 972, fourYear: 1836 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '210',
    yearRange: '1995 to 2002',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1728 } },
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1512, fourYear: 2160 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '211',
    yearRange: '2002 to 2009',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1404 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1728 } },
      { type: '8 Cyl', standard: { twoYear: 1404, fourYear: 1836 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '212',
    yearRange: '2009 to 2016',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1080, fourYear: 1620 }, amg: { twoYear: 1188, fourYear: 1836 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1836 }, amg: { twoYear: 1296, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1944 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '213',
    yearRange: '2016 to 2024',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1080, fourYear: 1728 }, amg: { twoYear: 1188, fourYear: 1944 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1800 }, amg: { twoYear: 1440, fourYear: 2040 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2040 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '214',
    yearRange: '2024 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1080, fourYear: 1728 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1188, fourYear: 1944 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '207',
    yearRange: '2009 to 2017',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1800 } },
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2040 } }
    ]
  },
  {
    model: 'E-Class/E Coupe',
    code: '238',
    yearRange: '2018 to 2023',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1296, fourYear: 1944 }, amg: { twoYear: 1446, fourYear: 2070 } },
      { type: '6 Cyl', standard: { twoYear: 1680, fourYear: 2310 }, amg: { twoYear: 2310, fourYear: 3270 } }
    ]
  },
  {
    model: 'G-Class',
    code: '463',
    yearRange: '1997 to 2018',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1944 }, amg: { twoYear: 1446, fourYear: 2070 } },
      { type: '8 Cyl', standard: { twoYear: 1680, fourYear: 2310 }, amg: { twoYear: 2310, fourYear: 3270 } }
    ]
  },
  {
    model: 'G-Class',
    code: '463A',
    yearRange: '2018 to Present',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1680, fourYear: 2640 }, amg: { twoYear: 2790, fourYear: 3270 } }
    ]
  },
  {
    model: 'GL/GLS-Class',
    code: '164',
    yearRange: '2006 to 2012',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1944 } }
    ]
  },
  {
    model: 'GL/GLS-Class',
    code: '166',
    yearRange: '2012 to 2019',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2160 }, amg: { twoYear: 2070, fourYear: 2790 } }
    ]
  },
  {
    model: 'GL/GLS-Class',
    code: '167',
    yearRange: '2019 to Present',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2160 }, amg: { twoYear: 2070, fourYear: 2790 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2160 } }
    ]
  },
  {
    model: 'GLA-Class',
    code: '156',
    yearRange: '2013 to 2020',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'GLA-Class',
    code: '247',
    yearRange: '2020 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 }, amg: { twoYear: 1590, fourYear: 2070 } }
    ]
  },
  {
    model: 'GLB-Class',
    code: '247',
    yearRange: '2020 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'GLC-Class',
    code: '253',
    yearRange: '2015 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1188, fourYear: 1944 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'GLK-Class',
    code: '204',
    yearRange: '2008 to 2015',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1944 } }
    ]
  },
  {
    model: 'Maybach',
    code: '240',
    yearRange: '2002 to 2012',
    engines: [
      { type: '12 Cyl', standard: { twoYear: 3120, fourYear: 3600 } }
    ]
  },
  {
    model: 'Maybach',
    code: '222',
    yearRange: '2015 to 2021',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 3120, fourYear: 3600 } },
      { type: '12 Cyl', standard: { twoYear: 3120, fourYear: 3600 } }
    ]
  },
  {
    model: 'Maybach',
    code: '223',
    yearRange: '2021 to Present',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 3120, fourYear: 3600 } },
      { type: '12 Cyl', standard: { twoYear: 3120, fourYear: 3600 } }
    ]
  },
  {
    model: 'Maybach',
    code: '167',
    yearRange: '2020 to Present',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 3120, fourYear: 3600 } }
    ]
  },
  {
    model: 'ML/GLE/GLE Coupe',
    code: '163',
    yearRange: '1997 to 2005',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 2160 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 2160 } }
    ]
  },
  {
    model: 'ML/GLE/GLE Coupe',
    code: '164',
    yearRange: '2005 to 2011',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1944 } }
    ]
  },
  {
    model: 'ML/GLE/GLE Coupe',
    code: '166',
    yearRange: '2011 to 2019',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2160 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2160 } }
    ]
  },
  {
    model: 'ML/GLE/GLE Coupe',
    code: '292',
    yearRange: '2015 to 2019',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2160 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2160 } }
    ]
  },
  {
    model: 'ML/GLE/GLE Coupe',
    code: '167',
    yearRange: '2019 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1440, fourYear: 2160 }, amg: { twoYear: 1590, fourYear: 2310 } },
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2160 }, amg: { twoYear: 1440, fourYear: 2070 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2280 }, amg: { twoYear: 2070, fourYear: 2790 } }
    ]
  },
  {
    model: 'R-Class',
    code: '251',
    yearRange: '2005 to 2015',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1944 }, amg: { twoYear: 1878, fourYear: 2526 } },
      { type: '8 Cyl', standard: { twoYear: 1080, fourYear: 1836 }, amg: { twoYear: 1188, fourYear: 1944 } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '140',
    yearRange: '1991 to 1999',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1296, fourYear: 1944 }, amg: { twoYear: 1770, fourYear: 1986 } },
      { type: '12 Cyl', standard: { twoYear: 1836, fourYear: 2484 }, amg: { twoYear: 1986, fourYear: 2634 } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '220',
    yearRange: '1999 to 2006',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 1944 } },
      { type: '8 Cyl', standard: { twoYear: 1404, fourYear: 2052 }, amg: { twoYear: 2070, fourYear: 2190 } },
      { type: '12 Cyl', standard: { twoYear: 2040, fourYear: 3000 }, amg: { twoYear: 2190, fourYear: 3150 } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '221',
    yearRange: '2005 to 2013',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2280 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2280 }, amg: { twoYear: 2070, fourYear: 2190 } },
      { type: '12 Cyl', standard: { twoYear: 2040, fourYear: 3000 }, amg: { twoYear: 2190, fourYear: 3150 } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '222',
    yearRange: '2013 to 2020',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2280 } },
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2280 }, amg: { twoYear: 2070, fourYear: 2190 } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '223',
    yearRange: '2020 to Present',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1440, fourYear: 2280 } },
      { type: '12 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'S-Class/S Coupe',
    code: '217',
    yearRange: '2014 to 2021',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1056, fourYear: 1920 } },
      { type: '8 Cyl', standard: { twoYear: 1056, fourYear: 1920 } },
      { type: '12 Cyl', standard: { twoYear: 1536, fourYear: 2304 } }
    ]
  },
  {
    model: 'SL-Class',
    code: '129',
    yearRange: '1989 to 2001',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1152, fourYear: 2400 }, amg: { twoYear: 1770, fourYear: 1878 } },
      { type: '8 Cyl', standard: { twoYear: 1536, fourYear: 2496 }, amg: { twoYear: 2202, fourYear: 2550 } },
      { type: '12 Cyl', standard: { twoYear: 2400, fourYear: 3600 }, amg: { twoYear: 2070, fourYear: 2550 } }
    ]
  },
  {
    model: 'SL-Class',
    code: '230',
    yearRange: '2001 to 2011',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 2700 } },
      { type: '8 Cyl', standard: { twoYear: 1728, fourYear: 2808 }, amg: { twoYear: 2550, fourYear: 3750 } },
      { type: '12 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: 2958, fourYear: 3750 } }
    ]
  },
  {
    model: 'SL-Class',
    code: '231',
    yearRange: '2012 to 2020',
    engines: [
      { type: '4 Cyl', standard: { twoYear: null, fourYear: null } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null } }
    ]
  },
  {
    model: 'SL-Class',
    code: '232',
    yearRange: '2022 to Present',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1536 } },
      { type: '6 Cyl', standard: { twoYear: 1188, fourYear: 1728 } }
    ]
  },
  {
    model: 'SLK/SLC-Class',
    code: '170',
    yearRange: '1996 to 2004',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 972, fourYear: 1920 } },
      { type: '6 Cyl', standard: { twoYear: 1296, fourYear: 2112 }, amg: { twoYear: 1770, fourYear: 2526 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: 1770, fourYear: 2958 } }
    ]
  },
  {
    model: 'SLK/SLC-Class',
    code: '171',
    yearRange: '2004 to 2010',
    engines: [
      { type: '4 Cyl', standard: { twoYear: 1080, fourYear: 1920 } },
      { type: '6 Cyl', standard: { twoYear: 1440, fourYear: 2112 }, amg: { twoYear: 1590, fourYear: 2526 } },
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: 1770, fourYear: 2958 } }
    ]
  },
  {
    model: 'SLK/SLC-Class',
    code: '172',
    yearRange: '2011 to 2020',
    engines: [
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: null, fourYear: 7230 } }
    ]
  },
  {
    model: 'SLR-Class',
    code: '199',
    yearRange: '2003 to 2010',
    engines: [
      { type: '8 Cyl', standard: { twoYear: null, fourYear: null }, amg: { twoYear: null, fourYear: 7230 } }
    ]
  },
  {
    model: 'SLS-Class',
    code: '197',
    yearRange: '2010 to 2015',
    engines: [
      { type: '8 Cyl', standard: { twoYear: 1800, fourYear: 2340 } }
    ]
  },
  {
    model: 'V-Class',
    code: '638',
    yearRange: '1996 to 2003',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1800, fourYear: 2340 } }
    ]
  },
  {
    model: 'V-Class',
    code: '639',
    yearRange: '2003 to 2014',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1800, fourYear: 2340 } }
    ]
  },
  {
    model: 'V-Class',
    code: '447',
    yearRange: '2014 to Present',
    engines: [
      { type: '6 Cyl', standard: { twoYear: 1800, fourYear: 2340 } }
    ]
  },
  // Electric Vehicles
  {
    model: 'EQA',
    code: 'H243',
    yearRange: '2021 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'EQB',
    code: 'X243',
    yearRange: '2021 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'EQC',
    code: 'N293',
    yearRange: '2019 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  },
  {
    model: 'EQE',
    code: 'V295',
    yearRange: '2021 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1440, fourYear: 1800 } }
    ]
  },
  {
    model: 'EQS',
    code: 'V297',
    yearRange: '2021 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1440, fourYear: 1800 } }
    ]
  },
  {
    model: 'EQV',
    code: 'W447',
    yearRange: '2020 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1440, fourYear: 2340 } }
    ]
  },
  {
    model: 'G-Class Electric',
    code: 'W463E',
    yearRange: '2024 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1800, fourYear: 2340 } }
    ]
  },
  {
    model: 'CLA Electric',
    code: 'C174E',
    yearRange: '2025 to Present',
    engines: [
      { type: 'ELEC', standard: { twoYear: 1188, fourYear: 1620 } }
    ]
  }
];

export default function ServiceContractPricing() {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');
  const [isAMG, setIsAMG] = useState(false);

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
    if (!engine) return null;
    
    const pricing = isAMG && engine.amg ? engine.amg : engine.standard;
    return pricing;
  }, [selectedModel, selectedYear, selectedEngine, isAMG]);

  // Check if AMG pricing is available
  const hasAMGPricing = useMemo(() => {
    if (!selectedModel || !selectedYear || !selectedEngine) return false;
    
    const yearData = contractPricingData.find(item => item.model === selectedModel && item.yearRange === selectedYear);
    if (!yearData) return false;
    
    const engine = yearData.engines.find(e => e.type === selectedEngine);
    return engine?.amg ? true : false;
  }, [selectedModel, selectedYear, selectedEngine]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear('');
    setSelectedEngine('');
    setIsAMG(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedEngine('');
    setIsAMG(false);
  };

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine);
    setIsAMG(false);
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

            {/* AMG Toggle */}
            {hasAMGPricing && (
              <div className="form-group">
                <label className="amg-toggle">
                  <input
                    type="checkbox"
                    checked={isAMG}
                    onChange={(e) => setIsAMG(e.target.checked)}
                  />
                  <span className="toggle-text">AMG Model</span>
                </label>
              </div>
            )}
          </div>

          {/* Pricing Display */}
          {currentPricing && (
            <div className="pricing-result">
              <div className="result-header">
                <h4 className="result-title">
                  {selectedModel} {selectedEngine} {isAMG ? 'AMG' : ''}
                </h4>
                <p className="result-subtitle">{selectedYear}</p>
              </div>
              
              <div className="pricing-cards">
                <div className="price-card">
                  <div className="price-header">
                    <Icon name="file-contract" size={20} variant="gold" />
                    <span className="price-label">2 Year Package</span>
                  </div>
                  <div className="price-amount">
                    {currentPricing.twoYear ? `AED ${currentPricing.twoYear.toLocaleString()}` : 'N/A'}
                  </div>
                </div>
                
                <div className="price-card featured">
                  <div className="price-header">
                    <Icon name="shield-alt" size={20} variant="gold" />
                    <span className="price-label">4 Year Package</span>
                  </div>
                  <div className="price-amount">
                    {currentPricing.fourYear ? `AED ${currentPricing.fourYear.toLocaleString()}` : 'N/A'}
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