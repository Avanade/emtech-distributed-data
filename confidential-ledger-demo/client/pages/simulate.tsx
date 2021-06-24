import { BeakerIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MotorwayGrid, CarIcon } from "@/components/CarVisualizations";
import { Grid, Dictionary, CarSimulation } from "@/lib/CarSimulation";
import { appendLedger } from "@/lib/cl-api";
import {MenuIcon, XIcon} from "@heroicons/react/outline";

const DynamicSlideOver = dynamic(() => import("../components/SlideOver"), {
  ssr: false,
});

const ledgerFunction = appendLedger;/* .env.NODE_ENV === 'production' ? appendLedger : (vehicleId: string, dataToAppend: Dictionary) => {
  console.log(`Mock function ran for ${vehicleId}`);
  console.log(dataToAppend);
};*/

export default function Simulate() {
  let [isOpen, setIsOpen] = useState(false);
  let [modal, setModal] = useState(<></>);
  let [carGrid, setCarGrid] = useState(new Grid(1,1));
  let [carSimulation, setCarSim] = React.useState<any>(false);

  useEffect(() => {
    if (carSimulation === false) {
      setCarSim(new CarSimulation(2000, ledgerFunction, setCarGrid));
    }
  });

  useEffect(() => {
    if (isOpen !== true) {
      setModal(<></>);
    }
  },[isOpen]);

  let displaySideModal = (header, guid):void => {
    setIsOpen(true);
    setModal(
        <>
          <DynamicSlideOver
              open={isOpen}
              header={header}
              guid={guid}
              setIsOpen={setIsOpen}
          />
        </>
    );
  }

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
              <MotorwayGrid grid={carGrid} displayModalFunction={displaySideModal} />
            {modal}
          </div>
        </div>
      </main>
    </div>
  );
}
