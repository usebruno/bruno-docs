import React from 'react';
import Image from 'next/image';

interface BrunoButtonProps {
  collectionUrl: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const BrunoButton: React.FC<BrunoButtonProps> = ({
  collectionUrl,
  width = 160,
  height = 40,
  className = '',
  style = {}
}) => {
  const encodedUrl = encodeURIComponent(collectionUrl);
  const buttonUrl = `https://fetch.usebruno.com?url=${encodedUrl}`;

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        margin: '2rem 0',
        ...style
      }}
      className={className}
    >
      <a 
        href={buttonUrl}
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Image 
          src="https://fetch.usebruno.com/button.svg" 
          alt="Fetch in Bruno" 
          width={width} 
          height={height}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </a>
    </div>
  );
};

export default BrunoButton;
