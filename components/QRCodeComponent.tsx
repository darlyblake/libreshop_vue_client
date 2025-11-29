'use client';

import { QRCodeCanvas } from "qrcode.react";

interface QRCodeComponentProps {
  value: string;
  size?: number;
}

export function QRCodeComponent({ value, size = 96 }: QRCodeComponentProps) {
  return (
    <div className="bg-white p-2 rounded-lg shadow border">
      <QRCodeCanvas
        value={value}
        size={size}
        level="H"
        includeMargin={true}
      />
    </div>
  );
}