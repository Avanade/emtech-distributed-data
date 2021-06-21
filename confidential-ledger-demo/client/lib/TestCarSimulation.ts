import { Grid, MockTickData, CarSimulation } from "./CarSimulation";

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

class TestCarSimulation extends CarSimulation {
}

let testSimulation = new TestCarSimulation( 500, MockTickData, printGrid);