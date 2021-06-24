import { Grid, GridSquare } from "@/lib/CarSimulation"
import React, {useState} from "react";
import {CarSimData, CarSimSensorReading, CarSimState} from "@/lib/CarSimDataGeneration";


export function MotorwayGrid(props) {
    let grid : Grid = props.grid;
    let gridSquares : GridSquare[][] =grid.gridSquares;
    let displayModalFunction=props.displayModalFunction;
    let [currentCarLicence, setCurrentCarLicence] = useState("");
    let [currentCarState, setCurrentCarState] = useState(<></>);

    let sideBarDisplay = (header, data) => {
        setCurrentCarLicence(header);
        setCurrentCarState(data);
    };
    
    return (<>
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="bg-gray-50 px-4 py-5 sm:p-6 grid-cols-2 grid">
                <div className="max-w-md bg-gray-300 grid grid-cols-5 gap-0 divide-x divide-white divide-dashed">
                    {gridSquares.slice().reverse().map((element) => (
                            element.map((yElement) => (
                                <CarIcon focusElement={sideBarDisplay} displayModalFunction={displayModalFunction} field={yElement.getField()} key={yElement.getCoordId()} squareContains={yElement.hasCar() ? "car" : "nothing"} />
                            ))
                    ))}
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-900">{currentCarLicence}</h3>
                    {currentCarState}
                </div>
            </div>
        </div>
    </>);
}

function buildData(carSimData:CarSimData) {
    let carStateData = carSimData.carState;
    let signalling="No signalling";
    if (carStateData.signal.signalL===true) {
        signalling="Signalling left";
    } else if (carStateData.signal.signalR===true) {
        signalling="Signalling right";
    }
    delete carStateData.signal;
    delete carStateData.gps;
    let carStateKeys = Object.keys(carStateData);

    let carStateList = carStateKeys.map((item) => (<li>{item}: {carStateData[item]}</li>));
    let builtDate = <>
        <p>Timestamp: {carSimData.meta.timestamp}</p>
        <p>Unique ID: {carSimData.meta.uuid}</p>
        <p>{signalling}</p>
        <p>
            <ul>{carStateList}</ul>
        </p>
    </>;
    return builtDate;
}

export function CarIcon(props) {
    if (props.squareContains === "car") {
        let displayModalFunction = props.displayModalFunction;
        let carClasses = "cursor-pointer inline-block " + props.field.carColor;
        let carTitle = props.field.licencePlate;
        let carData = props.field.metadata;
        let carId = props.field.id;

        return <div onMouseEnter={() => props.focusElement(carTitle, buildData(carData))}
                    onMouseLeave={() => props.focusElement("", <></>)}
                    onClick={() => displayModalFunction(carTitle, carId)} className={carClasses}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
        </div>;
    } else if (false) {
        return <div className="text-purple-600 text-blue-600 text-green-600 text-red-700 text-pink-900 text-yellow-900 text-grey-400 bg-gradient-to-r from-green-400 to-blue-500"/>
    } else {
        return <div>&nbsp;</div>;
    }
}

