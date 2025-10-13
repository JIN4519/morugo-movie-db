import React from 'react';

export function Logo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Film Strip Icon */}
      <div className="relative">
        <svg 
          width={size * 0.4} 
          height={size * 0.4} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Film strip background */}
          <rect x="6" y="4" width="36" height="40" rx="2" fill="#1f2937" />
          
          {/* Film perforations */}
          <rect x="8" y="8" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="12" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="16" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="20" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="24" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="28" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="32" width="3" height="2" rx="1" fill="#374151" />
          <rect x="8" y="36" width="3" height="2" rx="1" fill="#374151" />
          
          <rect x="37" y="8" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="12" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="16" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="20" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="24" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="28" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="32" width="3" height="2" rx="1" fill="#374151" />
          <rect x="37" y="36" width="3" height="2" rx="1" fill="#374151" />
          
          {/* Film frames */}
          <rect x="13" y="10" width="22" height="6" rx="1" fill="#ef4444" opacity="0.8" />
          <rect x="13" y="18" width="22" height="6" rx="1" fill="#f59e0b" opacity="0.8" />
          <rect x="13" y="26" width="22" height="6" rx="1" fill="#10b981" opacity="0.8" />
          <rect x="13" y="34" width="22" height="6" rx="1" fill="#3b82f6" opacity="0.8" />
          
          {/* Play button overlay */}
          <circle cx="24" cy="24" r="8" fill="rgba(255,255,255,0.9)" />
          <polygon points="21,19 21,29 30,24" fill="#1f2937" />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          모르고
        </h1>
        <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400 font-medium">
          MOVIE ADS
        </span>
      </div>
    </div>
  );
}

export function LogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Film strip background */}
        <rect x="6" y="4" width="36" height="40" rx="2" fill="#1f2937" />
        
        {/* Film perforations */}
        <rect x="8" y="8" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="12" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="16" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="20" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="24" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="28" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="32" width="3" height="2" rx="1" fill="#374151" />
        <rect x="8" y="36" width="3" height="2" rx="1" fill="#374151" />
        
        <rect x="37" y="8" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="12" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="16" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="20" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="24" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="28" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="32" width="3" height="2" rx="1" fill="#374151" />
        <rect x="37" y="36" width="3" height="2" rx="1" fill="#374151" />
        
        {/* Film frames */}
        <rect x="13" y="10" width="22" height="6" rx="1" fill="#ef4444" opacity="0.8" />
        <rect x="13" y="18" width="22" height="6" rx="1" fill="#f59e0b" opacity="0.8" />
        <rect x="13" y="26" width="22" height="6" rx="1" fill="#10b981" opacity="0.8" />
        <rect x="13" y="34" width="22" height="6" rx="1" fill="#3b82f6" opacity="0.8" />
        
        {/* Play button overlay */}
        <circle cx="24" cy="24" r="8" fill="rgba(255,255,255,0.9)" />
        <polygon points="21,19 21,29 30,24" fill="#1f2937" />
      </svg>
    </div>
  );
}