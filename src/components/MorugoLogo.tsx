import React from 'react';
import Layer1 from "../imports/Layer1";

export function MorugoLogo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Figma Icon */}
      <div className="relative" style={{ width: size * 0.4, height: size * 0.35 }}>
        <Layer1 />
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          모르고
        </h1>
        <span className="text-sm tracking-wide text-teal-600 dark:text-teal-400 font-medium">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}

export function MorugoLogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`${className}`} style={{ width: size, height: size * 0.9 }}>
      <Layer1 />
    </div>
  );
}

export function MorugoLogoHorizontal({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative" style={{ width: size * 0.3, height: size * 0.27 }}>
        <Layer1 />
      </div>
      
      {/* Text Stack */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
          모르고
        </h2>
        <span className="text-xs tracking-wider text-teal-600 dark:text-teal-400 font-medium mt-0.5">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}

export function MorugoLogoVertical({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Icon */}
      <div className="relative" style={{ width: size, height: size * 0.9 }}>
        <Layer1 />
      </div>
      
      {/* Text Stack */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
          모르고
        </h2>
        <span className="text-xs tracking-wider text-teal-600 dark:text-teal-400 font-medium mt-1">
          MOVIE DATABASE
        </span>
      </div>
    </div>
  );
}