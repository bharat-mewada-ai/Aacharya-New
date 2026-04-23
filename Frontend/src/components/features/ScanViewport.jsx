// Scan Viewport - STRICT IMPLEMENTATION
import { useState } from 'react';
import './ScanViewport.css';

const ScanViewport = ({ isScanning }) => {
  return (
    <div className="scan-viewport">
      <div className="scan-frame">
        <div className="scan-corner scan-corner-tl"></div>
        <div className="scan-corner scan-corner-tr"></div>
        <div className="scan-corner scan-corner-bl"></div>
        <div className="scan-corner scan-corner-br"></div>
        
        {isScanning && (
          <>
            <div className="scan-line"></div>
            <div className="scan-grid"></div>
          </>
        )}
      </div>
      
      <div className="scan-instructions">
        {isScanning ? (
          <p className="scan-text pulse">Analyzing...</p>
        ) : (
          <p className="scan-text">Position item within frame</p>
        )}
      </div>
    </div>
  );
};

export default ScanViewport;
