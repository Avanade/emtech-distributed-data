import { QrcodeIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BasicPage from "@/components/BasicPage";

const QrScanner = dynamic(() => import("react-webcam-barcode-scanner"), {
  ssr: false,
});

export default function Scan() {
  const router = useRouter();
  const [displayData, setDisplayData] = useState<any>("No QR code found.");
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
    <BasicPage title="Scan QR Code" icon={QrcodeIcon}>
      {" "}
      {instruction}
      <div className={validQrCode ? "hidden" : "place-content-center"}>
        <QrScanner
          // @ts-ignore
          className="w-1/3"
          onUpdate={(err, result) => {
            if (result) {
              // @ts-ignore
              setQrCode(result.text);
            }
          }}
        />
      </div>
      <p className={validQrCode ? "hidden" : "italic"}>{qrCode}</p>
      <p>{displayData}</p>
    </BasicPage>
  );
}
