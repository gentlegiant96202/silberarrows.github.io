'use client';

import React from 'react';

interface TeamMemberData {
  name: string;
  position: string;
  specialty: string;
  image: string;
  mobileImage: string;
  description: string;
}

interface TeamMemberProps {
  member: TeamMemberData;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="team-member">
      <div className="team-member-image">
        <picture>
          {/* Mobile: smaller optimized image (400x600, ~10KB) */}
          <source 
            media="(max-width: 768px)" 
            srcSet={member.mobileImage}
            type="image/avif"
          />
          {/* Desktop: full size image */}
          <img 
            src={member.image} 
            alt={member.name}
            width={720}
            height={1080}
            loading="lazy"
          />
        </picture>
        <div className="team-overlay">
          <div className="team-overlay-content">
            <p>{member.description}</p>
          </div>
        </div>
      </div>
      <div className="team-member-info">
        <h3>{member.name}</h3>
        <p className="team-designation">{member.position}</p>
        <div className="team-speciality">{member.specialty}</div>
      </div>
    </div>
  );
};

export default function TeamSection() {
  const teamMembers: TeamMemberData[] = [
    {
      name: 'Daniel Harrison',
      position: 'Head of Service',
      specialty: 'Certified Mercedes-Benz Technician',
      image: '/assets/images/DAN-1_02.webp',
      mobileImage: '/assets/images/DAN-1_02-mobile.avif',
      description: 'Leading our service operations with over 15 years of Mercedes-Benz expertise.'
    },
    {
      name: 'Lucy Woroniak',
      position: 'Service Advisor',
      specialty: 'Certified Service Advisor',
      image: '/assets/images/LUSY-2_02.webp',
      mobileImage: '/assets/images/LUSY-2_02-mobile.avif',
      description: 'Dedicated to providing exceptional customer service and technical support.'
    },
    {
      name: 'Essrar Ali',
      position: 'Service Advisor',
      specialty: 'Certified Service Advisor',
      image: '/assets/images/ESSRAR-3_02.webp',
      mobileImage: '/assets/images/ESSRAR-3_02-mobile.avif',
      description: 'Expert in customer relations and comprehensive service coordination.'
    }
  ];

  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Service Team</h2>
          <p>Experienced professionals dedicated to keeping your Mercedes-Benz in perfect condition.</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
} 