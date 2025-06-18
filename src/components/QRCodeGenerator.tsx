import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  employeeName: string; 
  equipmentSerial?: string; 
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  value, 
  size = 80, 
  className = '',
  employeeName,
  equipmentSerial
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

  // Función para descargar el código QR en mayor resolución con el serial incluido
  const downloadQRCode = () => {
    if (!canvasRef.current || isLoading) return;
    
    try {
      // Primero generamos el QR en un canvas temporal
      const qrCanvas = document.createElement('canvas');
      const downloadSize = size * 3; // Triplicamos el tamaño para mayor resolución
      const textHeight = 120; // Siempre añadimos espacio para el texto
      
      // Creamos el canvas final con espacio para texto
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = downloadSize + 40; // Añadir pequeños márgenes laterales
      finalCanvas.height = downloadSize + textHeight;
      const ctx = finalCanvas.getContext('2d');
      if (!ctx) return;
      
      // Fondo blanco para toda la imagen
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      
      // Generar el QR primero en su propio canvas
      QRCode.toCanvas(qrCanvas, value, {
        width: downloadSize,
        margin: 4,
        color: {
          dark: '#065f46', // emerald-800
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      }).then(() => {
        // Dibujar el QR en el canvas final (centrado)
        ctx.drawImage(qrCanvas, 20, 0, downloadSize, downloadSize);
        
        // Añadir el texto del serial
        ctx.fillStyle = '#065f46'; // Color del texto (verde esmeralda)
        
        // Título "SERIAL"
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('SERIAL', finalCanvas.width / 2, downloadSize + 20);
        
        // Valor del serial (usar el serial real o "N/A" si no existe)
        const serialText = equipmentSerial || "N/A";
        ctx.font = 'bold 48px Arial';
        ctx.fillText(serialText, finalCanvas.width / 2, downloadSize + 60);
        
        console.log("Serial del equipo:", serialText); // Debug
        
        // Obtener la URL del canvas final
        const dataURL = finalCanvas.toDataURL('image/png');
        
        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `QR-${employeeName.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err => {
        console.error('Error generando QR de alta resolución:', err);
      });
    } catch (err) {
      console.error('Error descargando QR code:', err);
    }
  };

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
      <div className="relative">
        <canvas
          ref={canvasRef}
          className={`rounded-lg shadow-sm border border-gray-200 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          style={{ width: size, height: size }}
        />
        {!isLoading && (
          <button 
            onClick={downloadQRCode}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-full flex items-center justify-center shadow-md"
            title="Descargar código QR"
          >
            <Download size={16} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;