import {v4 as uuidv4} from 'uuid';

type canContain = Car | null;

interface Car {
    licencePlate: string;
    sprite: string;
    id: string;
    location: { x: number, y: number};
}

interface GridSquare {
    squareContains: canContain;
}

interface Grid {
    x_dimension: number;
    y_dimension: number;
    grid_squares: GridSquare[][];
}

class Car implements Car {
    public licencePlate: string;
    public sprite: string;
    public id: string;

    constructor(licencePlate: string, sprite: string) {
        this.licencePlate = licencePlate;
        this.sprite = sprite;
        this.id = uuidv4();
    }
}

class GridSquare implements GridSquare {
    squareContains: canContain;
    constructor() {
        this.squareContains = null;
    }

    setField(newField: Car | null):void {
        if (this.squareContains instanceof Car) {
            throw new Error("Tried to put a car where a car already exists.");
        }
        this.squareContains = newField;
    }

    getField():Car| null{
        return this.squareContains;
    }

    getFieldType():string {
        if (this.squareContains instanceof Car) {
            return "Car";
        } else {
            return "null";
        }
    }
}

class Grid implements Grid {
    x_dimension: number;
    y_dimension: number;
    grid_squares: GridSquare[][];
    constructor(x_dimension: number, y_dimension: number) {
        this.x_dimension = x_dimension;
        this.y_dimension = y_dimension;
        this.grid_squares = this.InitGrid(x_dimension, y_dimension);
    }

    InitGrid(x_dimension: number, y_dimension: number): GridSquare[][] {
        let grid_squares: GridSquare[][]=[];
        for(var x: number = 0;x< x_dimension; x++) {
            grid_squares[x] = [];
            for(var y: number = 0; y< y_dimension; y++) {
                grid_squares[x][y] = new GridSquare();
            }
        }
        return grid_squares;
    }

    CountEmpty(): number {
        let grid: GridSquare[][] = this.grid_squares;
        let empty:number = 0;
        for(let x: number = 0; x< this.x_dimension; x++) {
            for (let y: number = 0; y < this.y_dimension; y++) {
                let grid_square: GridSquare = this.grid_squares[x][y];
                if (grid_square.getFieldType() ===  'null') {
                    empty++;
                }
            }
        }
        return empty;
    }
}


class CarSimulation {
    grid: Grid;
    max_cars: number;
    timer: ReturnType<typeof setInterval>;


    constructor(max_cars: number, tickLengthMilliseconds: number) {
        this.max_cars = max_cars;
        this.grid = new Grid(4, 4);
        this.initSimulation(tickLengthMilliseconds);
    }

    initSimulation(tickLengthMilliseconds: number) {
        let startingCars = this.randomNumber(1, this.max_cars);
        this.grid = this.addCars(startingCars, this.grid);
        this.timer = setInterval(() => this.runTimeStep(), tickLengthMilliseconds)
    }

    addCars(carAmountToAdd: number, grid: Grid): Grid {
        let total_squares = grid.x_dimension * grid.y_dimension;
        if (carAmountToAdd > total_squares) {
            throw new Error("Asked for more cars than there's space for.");
        }
        let empty_square = grid.CountEmpty();
        if (carAmountToAdd > empty_square) {
            throw new Error("Asked for more cars than there's empty squares.");
        }
        return grid;
    }

    randomNumber(min: number, max:number):number {
        return Math.random() * (max - min) + min;
    }

    runTimeStep() {
        let currentCars = this.countCars();
        if (currentCars<this.max_cars) {

        }

    }

    countCars() {
        return 10;
    }

    moveVehicles() { }

    endSimulation() {
        clearInterval(this.timer);
    }
}