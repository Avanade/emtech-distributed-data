import {v4 as uuid4} from 'uuid';
import { DateTime } from 'luxon';

type canContain = Car | null;

interface Car {
    licencePlate: string;
    sprite: string;
    id: string;
    location: { x: number, y: number };
}

interface GridSquare {
    squareContains: canContain;
}

interface Grid {
    xDimension: number;
    yDimension: number;
    gridSquares: GridSquare[][];
}

class Car implements Car {
    public licencePlate: string;
    public sprite: string;
    public id: string;

    constructor(licencePlate: string, sprite: string) {
        this.licencePlate = licencePlate;
        this.sprite = sprite;
        this.id = uuid4();
    }
}

class GridSquare implements GridSquare {
    squareContains: canContain;
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

    getField(): Car | null {
        return this.squareContains;
    }

    updateCoordinates(xCoordinate:number, yCoordinate: number): void {
        this.xCoordinate=xCoordinate;
        this.yCoordinate=yCoordinate;
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

class Grid implements Grid {
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


class CarSimulation {
    grid: Grid;
    timer: ReturnType<typeof setInterval>;


    constructor(tickLengthMilliseconds: number) {
        this.grid = new Grid(4, 10);
        this.initSimulation(tickLengthMilliseconds);
    }

    initSimulation(tickLengthMilliseconds: number) {
        let startingCars = this.randomNumber(this.grid.xDimension);
        this.addCars(startingCars);
        this.timer = setInterval(() => this.runTimeStep(), tickLengthMilliseconds);
        console.log("Simulation started, running every %sms.",tickLengthMilliseconds);
        this.printGrid();
    }

    addCars(carAmountToAdd: number): void {
        let startingColumn=[...this.grid.gridSquares[0]];
        startingColumn=startingColumn.sort( () => .5 - Math.random() );//not truly random, but this isn't crypto
        let carsLeftToAdd=carAmountToAdd;
        while (carsLeftToAdd>0) {
            let nextSquare=startingColumn.shift();
            let newCar:Car=new Car("LICENCE","nosprite"); // TODO: Add licence plates and sprits
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
        this.printGrid();
    }

    printGrid() {
        let gridSquares=this.grid.gridSquares;
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

let testSimulation = new CarSimulation( 500);