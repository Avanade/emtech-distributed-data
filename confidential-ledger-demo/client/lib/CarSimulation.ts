import {v4 as uuid4} from 'uuid';
import {DateTime} from 'luxon';

type CanContain = Car | null;

export type Dictionary = {
    [x: string]: boolean | Dictionary;
};


export interface Car {
    licencePlate: string;
    sprite: string;
    id: string;
    location: { x: number, y: number };
}

export interface GridSquare {
    squareContains: CanContain;
}

export interface Grid {
    xDimension: number;
    yDimension: number;
    gridSquares: GridSquare[][];
}

export class Car implements Car {
    public licencePlate: string;
    public carColor: string;
    public id: string;
    public metadata: Dictionary;

    constructor(licencePlate: string) {
        this.licencePlate = licencePlate;
        this.id = uuid4();
        this.setCarColor();
    }

    setCarColor(): void {
        let carColors = [ "text-purple-600", "text-blue-600", "text-green-600", "text-red-700", "text-pink-900","text-yellow-900","text-grey-400 bg-gradient-to-r from-green-400 to-blue-500" ];
        let randIndex = Math.floor(Math.random() * carColors.length);
        this.carColor=carColors[randIndex];
    }

    setCarMetadata(metadata: Dictionary) {
        this.metadata=metadata;
    }
}

export class GridSquare implements GridSquare {
    squareContains: CanContain;
    xCoordinate: number;
    yCoordinate: number;

    constructor(xCoordinate: number, yCoordinate: number) {
        this.squareContains = null;
        this.xCoordinate=xCoordinate;
        this.yCoordinate=yCoordinate;
    }

    setField(newField: Car | null): void {
        if (this.squareContains instanceof Car) {
            throw new Error("Tried to put a car where a car already exists.");
        }
        this.squareContains = newField;
    }

    getCoordId(): string {
        let id:string=this.xCoordinate+"-"+this.yCoordinate;
        return id;
    }

    getField(): Car | null {
        return this.squareContains;
    }

    updateCoordinates(xCoordinate:number, yCoordinate: number): void {
        this.xCoordinate=xCoordinate;
        this.yCoordinate=yCoordinate;
    }

    appendMetadata(ledgerAppendFunction: (vehicleId: string, dataToAppend: Dictionary) => void): void{
        if (this.hasCar()===true) {
            let car=this.getField();
            let carId=car.id;
            let carMetadata=car.metadata;
            ledgerAppendFunction(carId, carMetadata);
        }

    }

    hasCar(): boolean {
        if (this.getFieldType() == "Car") {
            return true;
        } else {
            return false;
        }
    }

    getFieldType(): string {
        if (this.squareContains instanceof Car) {
            return "Car";
        } else {
            return "null";
        }
    }
}

export class Grid implements Grid {
    xDimension: number;
    yDimension: number;
    gridSquares: GridSquare[][];

    constructor(xDimension: number, yDimension: number) {
        this.xDimension = xDimension;
        this.yDimension = yDimension;
        this.gridSquares = this.initGrid(xDimension, yDimension);
    }

    initGrid(xDimension: number, yDimension: number): GridSquare[][] {
        let gridSquares: GridSquare[][] = [];
        for (let x: number = 0; x < xDimension; x++) {
            gridSquares[x] = this.initRow(x,yDimension);
        }
        return gridSquares;
    }

    initRow(xDimension:number, yDimension: number):GridSquare[] {
        let newRow=[];
        for (let y: number = 0; y < yDimension; y++) {
            newRow[y] = new GridSquare(xDimension,y);
        }
        return newRow;
    }

    getCarSquares():GridSquare[][] {
        let carSquares: GridSquare[][] = [];
        for (let x: number = 0; x < this.xDimension; x++) {
            carSquares[x]=[];
            this.gridSquares[x].forEach((yElement) => {
                if (yElement.hasCar()) {
                    let yCoOrd=yElement.yCoordinate;
                    carSquares[x][yCoOrd]=yElement;
                }
            })
        }
        return carSquares;
    }
}

export class CarSimulation {
    grid: Grid;
    timer: ReturnType<typeof setInterval>;
    ledgerAppendFunction:(vehicleId: string, dataToAppend: Dictionary) => void;
    stepCallbackFunction:(gridData: Grid) => void;


    constructor(tickLengthMilliseconds: number, ledgerAppendFunction: (vehicleId: string, dataToAppend: Dictionary) => void, stepCallbackFunction: (gridToPrint: Grid) => void) {
        this.grid = new Grid(10, 10);
        this.ledgerAppendFunction=ledgerAppendFunction;
        this.stepCallbackFunction=stepCallbackFunction;
        this.initSimulation(tickLengthMilliseconds);
    }

    initSimulation(tickLengthMilliseconds: number) {
        let startingCars = this.randomNumber(this.grid.xDimension);
        this.addCars(startingCars);
        this.timer = setInterval(() => this.runTimeStep(), tickLengthMilliseconds);
        console.log("Simulation started, running every %sms.",tickLengthMilliseconds);
        this.stepCallbackFunction(this.grid);
    }

    addCars(carAmountToAdd: number): void {
        let startingColumn=[...this.grid.gridSquares[0]];
        startingColumn=startingColumn.sort( () => .5 - Math.random() );//not truly random, but this isn't crypto
        let carsLeftToAdd=carAmountToAdd;
        while (carsLeftToAdd>0) {
            let nextSquare=startingColumn.shift();
            let newCar:Car=new Car("LICENCE"); // TODO: Add licence plates and sprits
            let yCoOrd:number=nextSquare.yCoordinate;
            let gridSquare:GridSquare=this.grid.gridSquares[0][yCoOrd];
            gridSquare.setField(newCar);
            carsLeftToAdd--;
        }
    }

    randomNumber(max: number): number {
        return Math.floor(Math.random() * max) + 1;
    }

    runTimeStep() {
        console.log("Time step. %s",DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS));
        this.grid=this.moveVehicles();
        this.addCars(this.randomNumber(this.grid.xDimension));
        this.stepCallbackFunction(this.grid);
    }

    moveVehicles():Grid {
        let xWidth=this.grid.xDimension;
        let yHeight=this.grid.yDimension;
        let nextTick = new Grid(xWidth, yHeight);
        let carSquares=this.grid.getCarSquares();

        carSquares.forEach((xColumn) => {
           xColumn.forEach((yGridSquare)=> {
              let targetX=yGridSquare.xCoordinate+1;
              if (targetX<xWidth) {
                  let targetY=yGridSquare.yCoordinate;
                  yGridSquare.updateCoordinates(targetX,targetY);
                  yGridSquare.appendMetadata(this.ledgerAppendFunction);
                  nextTick.gridSquares[targetX][targetY]=yGridSquare;
              }
           });
        });
        return nextTick;
    }

    endSimulation() {
        clearInterval(this.timer);
        console.log("Simulation ended.");
    }
}