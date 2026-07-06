import React from 'react';

/**
 * PremiumBD brand mark — a jeweled crown on the brand's rose→pink gradient tile.
 * Same artwork as public/logo.svg (the favicon); keep the two in sync.
 */
const Logo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" className={className} role="img" aria-label="PremiumBD logo">
    <defs>
      <linearGradient id="pbd-logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f43f5e" />
        <stop offset="1" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#pbd-logo-grad)" />
    <path d="M15 42 L15 26 L24 32 L32 19 L40 32 L49 26 L49 42 Z" fill="#ffffff" />
    <rect x="15" y="45" width="34" height="4.5" rx="2.25" fill="#ffffff" />
    <circle cx="32" cy="14.5" r="3.2" fill="#FFD700" />
    <circle cx="15" cy="22" r="2.2" fill="#FFD700" opacity="0.9" />
    <circle cx="49" cy="22" r="2.2" fill="#FFD700" opacity="0.9" />
  </svg>
);

export default Logo;
