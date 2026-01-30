'use client';

import React from 'react';
import Icon from './Icon';

interface ContactCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  actionIcon: string;
  isExternal?: boolean;
  flip?: boolean;
}

interface WorkingHours {
  day: string;
  time: string;
  isWeekend?: boolean;
}

export default function ContactSection() {
  const contactCards: ContactCard[] = [
    {
      id: 'phone',
      icon: 'phone-alt',
      title: 'Call Us Today',
      description: 'For immediate assistance',
      actionText: '+971 4 380 5515',
      actionLink: 'tel:+97143805515',
      actionIcon: 'phone-alt',
      flip: true
    },
    {
      id: 'whatsapp',
      icon: 'whatsapp',
      title: 'WhatsApp',
      description: 'Quick service enquiries',
      actionText: 'Start Chat',
      actionLink: 'https://wa.me/97143805515',
      actionIcon: 'whatsapp',
      isExternal: true
    }
  ];

  const workingHours: WorkingHours[] = [
    {
      day: 'Monday - Saturday',
      time: '8:00 AM - 6:00 PM'
    },
    {
      day: 'Sunday',
      time: 'Closed',
      isWeekend: true
    }
  ];

  const mapOverlayActions = [
    {
      href: 'https://www.google.com/maps/dir/?api=1&destination=SilberArrows,+Al+Manara+Street,+Al+Quoz,+Dubai',
      icon: 'directions',
      text: 'Get Directions',
      variant: 'dark' as const,
      isPrimary: true,
      isExternal: true
    },
    {
      href: 'tel:+97143805515',
      icon: 'phone',
      text: 'Call',
      variant: 'gold' as const
    },
    {
      href: 'https://wa.me/97143805515',
      icon: 'whatsapp',
      text: 'WhatsApp',
      variant: 'gold' as const,
      isExternal: true
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <div className="contact-header">
          <h2>CONTACT US</h2>
          <p>Get in touch with Dubai&apos;s trusted Mercedes-Benz specialists</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-methods">
            <div className="contact-cards-grid">
              {contactCards.map((card) => (
                <div key={card.id} className={`contact-card ${card.id}-card`}>
                  <div className="card-icon">
                    <Icon name={card.icon} size={24} variant="gold" flip={card.flip} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="card-action">
                    <a 
                      href={card.actionLink} 
                      className="action-link"
                      target={card.isExternal ? '_blank' : undefined}
                      rel={card.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <Icon name={card.actionIcon} size={16} variant="gold" flip={card.flip} />
                      {card.actionText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="hours-card">
              <div className="hours-header">
                <Icon name="clock" size={20} variant="gold" />
                <h3>Working Hours</h3>
              </div>
              <div className="hours-grid">
                {workingHours.map((hour, index) => (
                  <div key={index} className={`hours-item ${hour.isWeekend ? 'weekend' : ''}`}>
                    <span className="day">{hour.day}</span>
                    <span className="time">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="contact-map">
            <div className="map-container">
              <img
                src="/assets/images/al-manara-location.webp"
                alt="SilberArrows Mercedes-Benz Service Location - Al Manara Street, Al Quoz, Dubai"
                width="800"
                height="600"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  border: 0 
                }}
                loading="lazy"
              />
              <div className="map-info-overlay">
                <div className="overlay-content">
                  <div className="location-icon">
                    <Icon name="location-dot" size={24} variant="gold" />
                  </div>
                  <h4>Visit Our Workshop</h4>
                  <p>Al Manara Street, Al Quoz<br />Dubai, United Arab Emirates</p>
                  <div className="overlay-actions">
                    {mapOverlayActions.map((action, index) => (
                      <a 
                        key={index}
                        href={action.href} 
                        className={`map-action ${action.isPrimary ? 'primary' : ''}`}
                        target={action.isExternal ? '_blank' : undefined}
                        rel={action.isExternal ? 'noopener noreferrer' : undefined}
                      >
                        <Icon name={action.icon} size={16} variant={action.variant} />
                        {action.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 