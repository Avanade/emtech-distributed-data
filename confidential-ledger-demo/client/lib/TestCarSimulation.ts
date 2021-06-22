import { Grid, Dictionary, CarSimulation } from "@/lib/CarSimulation";

function printGrid(gridToPrint: Grid) {
    let gridSquares=gridToPrint.gridSquares;
    gridSquares.slice().reverse().forEach((element,index) => {
        let printString="-" + index + "-";
        element.forEach((yElement,yIndex) => {
            if (yElement.hasCar()) {
                printString+="c";
            } else {
                printString+="-";
            }
        });
        console.log(printString);
    })
}

export function MockTickData(vehicleId: string, dataToAppend: Dictionary) {
    console.log(`Mock function ran for ${vehicleId}`);
    console.log(dataToAppend);
}

let testSimulation = new CarSimulation( 500, MockTickData, printGrid);