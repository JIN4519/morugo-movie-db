import React from 'react';

interface NewMorugoLogoProps {
  size?: number;
  className?: string;
}

export function NewMorugoLogo({ size = 120, className = '' }: NewMorugoLogoProps) {
  // 로컬 개발 시: public/images/logo.png 파일을 사용하세요
  // 로고 이미지를 public/images/ 폴더에 저장하세요
  const logoImage = '/src/public/images/logo.png';
  
  return (
    <img 
      src={logoImage} 
      alt="모르고 (MORUGO)" 
      style={{ height: `${size}px`, width: 'auto' }}
      className={className}
    />
  );
}
