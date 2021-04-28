import { QrcodeIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { useRouter } from "next/router";

export default function Scan() {
  const router = useRouter();
  const [displayData, setDisplayData] = useState("No QR code found.");
  const [instruction, setInstruction] = useState(
    "Point your device's camera at a QR code to detect it."
  );
  const [qrCode, setQrCode] = useState("");
  const [validQrCode, setQrCodeValidity] = useState(false);

  useEffect(() => {
    if (qrCode.search("actif") === 0) {
      setQrCodeValidity(true);
      setInstruction(
        "You have scanned a valid data sharing code. If you would like to share your data, open the data sharer."
      );
      router.push("/share/" + qrCode);
      setDisplayData(
        <>
          <a
            href={"/share/" + qrCode}
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span>Open Data Sharer</span>
          </a>
        </>
      );
    } else if (qrCode !== "") {
      setDisplayData(<>Not a valid Oltiva Actif QR code.</>);
    }
  });

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
            {instruction}
            <div className={validQrCode ? "hidden" : "place-content-center"}>
              <BarcodeScannerComponent
                className="w-1/3"
                onUpdate={(err, result) => {
                  if (result) {
                    setQrCode(result.text);
                  }
                }}
              />
            </div>
            <p className={validQrCode ? "hidden" : "italic"}>{qrCode}</p>
            <p>{displayData}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
