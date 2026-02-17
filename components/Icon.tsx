import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  variant?: 'white' | 'dark' | 'gold' | 'silver' | 'inherit';
  flip?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 24, variant = 'white', flip = false }) => {
  const iconMap: { [key: string]: string } = {
    // Solid icons
    'phone': '/assets/icons/fontawesome/phone.svg',
    'location-dot': '/assets/icons/fontawesome/location-dot.svg',
    'medal': '/assets/icons/fontawesome/medal.svg',
    'clock': '/assets/icons/fontawesome/clock.svg',
    'directions': '/assets/icons/fontawesome/directions.svg',
    'cogs': '/assets/icons/fontawesome/cogs.svg',
    'star': '/assets/icons/fontawesome/star.svg',
    'user-shield': '/assets/icons/fontawesome/user-shield.svg',
    'file-contract': '/assets/icons/fontawesome/file-contract.svg',
    'shield-alt': '/assets/icons/fontawesome/shield-alt.svg',
    'truck': '/assets/icons/fontawesome/truck.svg',
    'check': '/assets/icons/fontawesome/check.svg',
    'phone-alt': '/assets/icons/fontawesome/phone-alt.svg',
    'tag': '/assets/icons/fontawesome/tag.svg',
    // Brands
    'whatsapp': '/assets/icons/fontawesome/whatsapp.svg'
  };

  const iconSrc = iconMap[name];
  
  if (!iconSrc) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  // Color filters for different variants
  const getColorFilter = (variant: string) => {
    switch (variant) {
      case 'white':
        return 'brightness(0) saturate(100%) invert(100%)'; // Pure white
      case 'dark':
        return 'brightness(0) saturate(100%)'; // Pure black
      case 'gold':
        return 'brightness(0) saturate(100%) invert(85%) sepia(10%) saturate(200%) hue-rotate(180deg) brightness(90%)'; // Gold/silver tone
      case 'silver':
        return 'brightness(0) saturate(100%) invert(70%) sepia(5%) saturate(150%) hue-rotate(180deg) brightness(95%)'; // Silver/grey tone
      case 'inherit':
        return 'none'; // No filter, use original colors
      default:
        return 'brightness(0) saturate(100%) invert(100%)'; // Default to white
    }
  };

  return (
    <img 
      src={iconSrc}
      alt={`${name} icon`}
      className={`icon ${className}`}
      style={{
        width: sizeStyle,
        height: sizeStyle,
        filter: getColorFilter(variant),
        display: 'inline-block',
        verticalAlign: 'middle',
        transform: flip ? 'scaleX(-1)' : 'none'
      }}
    />
  );
};

export default Icon; 