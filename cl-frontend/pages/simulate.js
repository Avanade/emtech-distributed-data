import { BeakerIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import Panel from "../components/Panel";
import dynamic from "next/dynamic";

const DynamicSlideOver = dynamic(() => import("../components/SlideOver"), {
  ssr: false,
});

export default function Simulate() {
  let [isOpen, setIsOpen] = useState(false);
  let [modal, setModal] = useState(<></>);
  useEffect(() => {
    if (isOpen === true) {
      setModal(
        <>
          <DynamicSlideOver open={isOpen} setIsOpen={setIsOpen} />
        </>
      );
    } else {
      setModal(<></>);
    }
  });

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <BeakerIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Vehicle Simulation
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Panel>
              <button onClick={() => setIsOpen(true)}>Content</button>
            </Panel>
            {modal}
          </div>
        </div>
      </main>
    </div>
  );
}
