import React from 'react';

export function OriginalMorugoLogo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Discovery Icon - Question mark with film reel */}
      <div className="relative">
        <svg 
          width={size * 0.4} 
          height={size * 0.4} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer film reel circle */}
          <circle cx="32" cy="32" r="28" fill="#4f46e5" stroke="#6366f1" strokeWidth="2"/>
          
          {/* Film holes around the circle */}
          <circle cx="32" cy="8" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="14" r="2" fill="#1e1b4b"/>
          <circle cx="56" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="32" cy="56" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="8" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="14" r="2" fill="#1e1b4b"/>
          
          {/* Inner question mark */}
          <path 
            d="M26 20c0-3.5 2.5-6 6-6s6 2.5 6 6c0 2-1 3-2.5 4.5L34 26v3m0 4h.01" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Central film strip effect */}
          <rect x="28" y="16" width="8" height="32" fill="rgba(255,255,255,0.1)" rx="1"/>
          <rect x="29" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="24" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="28" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="36" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="40" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="44" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          모르고
        </h1>
        <span className="text-sm tracking-wide text-indigo-600 dark:text-indigo-400 font-medium">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}

export function OriginalMorugoLogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer film reel circle */}
        <circle cx="32" cy="32" r="28" fill="#4f46e5" stroke="#6366f1" strokeWidth="2"/>
        
        {/* Film holes around the circle */}
        <circle cx="32" cy="8" r="2" fill="#1e1b4b"/>
        <circle cx="46" cy="14" r="2" fill="#1e1b4b"/>
        <circle cx="56" cy="32" r="2" fill="#1e1b4b"/>
        <circle cx="46" cy="50" r="2" fill="#1e1b4b"/>
        <circle cx="32" cy="56" r="2" fill="#1e1b4b"/>
        <circle cx="18" cy="50" r="2" fill="#1e1b4b"/>
        <circle cx="8" cy="32" r="2" fill="#1e1b4b"/>
        <circle cx="18" cy="14" r="2" fill="#1e1b4b"/>
        
        {/* Inner question mark */}
        <path 
          d="M26 20c0-3.5 2.5-6 6-6s6 2.5 6 6c0 2-1 3-2.5 4.5L34 26v3m0 4h.01" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Central film strip effect */}
        <rect x="28" y="16" width="8" height="32" fill="rgba(255,255,255,0.1)" rx="1"/>
        <rect x="29" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="29" y="24" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="29" y="28" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="29" y="36" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="29" y="40" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="29" y="44" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
      </svg>
    </div>
  );
}

export function OriginalMorugoLogoHorizontal({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <svg 
          width={size * 0.35} 
          height={size * 0.35} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#4f46e5" stroke="#6366f1" strokeWidth="2"/>
          <circle cx="32" cy="8" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="14" r="2" fill="#1e1b4b"/>
          <circle cx="56" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="32" cy="56" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="8" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="14" r="2" fill="#1e1b4b"/>
          <path 
            d="M26 20c0-3.5 2.5-6 6-6s6 2.5 6 6c0 2-1 3-2.5 4.5L34 26v3m0 4h.01" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="28" y="16" width="8" height="32" fill="rgba(255,255,255,0.1)" rx="1"/>
          <rect x="29" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="24" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="28" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="36" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="40" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="44" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      
      {/* Text Stack */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
          모르고
        </h2>
        <span className="text-xs tracking-wider text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}

export function OriginalMorugoLogoVertical({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#4f46e5" stroke="#6366f1" strokeWidth="2"/>
          <circle cx="32" cy="8" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="14" r="2" fill="#1e1b4b"/>
          <circle cx="56" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="46" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="32" cy="56" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="50" r="2" fill="#1e1b4b"/>
          <circle cx="8" cy="32" r="2" fill="#1e1b4b"/>
          <circle cx="18" cy="14" r="2" fill="#1e1b4b"/>
          <path 
            d="M26 20c0-3.5 2.5-6 6-6s6 2.5 6 6c0 2-1 3-2.5 4.5L34 26v3m0 4h.01" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="28" y="16" width="8" height="32" fill="rgba(255,255,255,0.1)" rx="1"/>
          <rect x="29" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="24" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="28" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="36" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="40" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="29" y="44" width="6" height="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      
      {/* Text Stack */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
          모르고
        </h2>
        <span className="text-xs tracking-wider text-indigo-600 dark:text-indigo-400 font-medium mt-1">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}

// Alternative colorful version
export function OriginalMorugoLogoColorful({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Colorful Discovery Icon */}
      <div className="relative">
        <svg 
          width={size * 0.4} 
          height={size * 0.4} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient background circle */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6"/>
              <stop offset="50%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
          
          <circle cx="32" cy="32" r="28" fill="url(#logoGradient)" stroke="#4338ca" strokeWidth="2"/>
          
          {/* Colorful film holes */}
          <circle cx="32" cy="8" r="2" fill="#fbbf24"/>
          <circle cx="46" cy="14" r="2" fill="#f59e0b"/>
          <circle cx="56" cy="32" r="2" fill="#ef4444"/>
          <circle cx="46" cy="50" r="2" fill="#ec4899"/>
          <circle cx="32" cy="56" r="2" fill="#8b5cf6"/>
          <circle cx="18" cy="50" r="2" fill="#3b82f6"/>
          <circle cx="8" cy="32" r="2" fill="#10b981"/>
          <circle cx="18" cy="14" r="2" fill="#06b6d4"/>
          
          {/* White question mark */}
          <path 
            d="M26 20c0-3.5 2.5-6 6-6s6 2.5 6 6c0 2-1 3-2.5 4.5L34 26v3m0 4h.01" 
            stroke="white" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Central film strip with gradient */}
          <rect x="28" y="16" width="8" height="32" fill="rgba(255,255,255,0.15)" rx="1"/>
          <rect x="29" y="20" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="29" y="24" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="29" y="28" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="29" y="36" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="29" y="40" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="29" y="44" width="6" height="2" fill="rgba(255,255,255,0.4)"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          모르고
        </h1>
        <span className="text-sm tracking-wide text-indigo-600 dark:text-indigo-400 font-medium">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}