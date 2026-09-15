import React from 'react';

export function PurgeLogo({ className = "brand-logo" }) {
  return (
    <div className={`logo-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <picture>
        <source srcSet="/images/purge-logo-vector.webp 2x, /images/purge-logo.webp 1x" type="image/webp" />
        <img 
          src="/images/purge-logo.webp" 
          alt="Purge Wholesale Blinds" 
          style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </picture>
    </div>
  );
}

export default PurgeLogo;
