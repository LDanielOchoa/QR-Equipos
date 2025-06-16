import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  value, 
  size = 80, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 1,
          color: {
            dark: '#065f46', // emerald-800
            light: '#ffffff'
          },
          errorCorrectionLevel: 'M'
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('Error generating QR code');
        setIsLoading(false);
        console.error('QR Code generation error:', err);
      }
    };

    generateQR();
  }, [value, size]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} 
           style={{ width: size, height: size }}>
        <span className="text-xs text-gray-500">Error</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse"
             style={{ width: size, height: size }}>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`rounded-lg shadow-sm border border-gray-200 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default QRCodeGenerator;