import { QrcodeIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

export default function Scan() {
  const [data, setData] = useState("No QR code found");

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <QrcodeIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Scan QR Code
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            Point your device's camera at a QR code to detect it.
            <div className="place-content-center">
              <BarcodeScannerComponent
                className="w-1/3"
                onUpdate={(err, result) => {
                  if (result) setData(result.text);
                  else setData("No QR code found");
                }}
              />
            </div>
            <p>{data}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
