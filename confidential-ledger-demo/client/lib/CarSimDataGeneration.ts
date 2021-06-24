import {Dictionary} from "@/lib/CarSimulation";

export type CarSimSensorReading = {
    sensorType: string;
    timestamp: string;
    sensorId: string;
    readingType: string;
    readingValue: number | false;
};

export type CarSimGps = {
    lat:number,
    lon:number
};

export type CarSimState = {
    signal: {
        "signalL":boolean,
        "signalR":boolean
    },
    brakePressure:number,
    speedInKph: number,
    autoPilotEnabled: boolean,
    cruiseControlEnabled: boolean,
    temperatureInCelsius: number,
    humidityInRelativeHumidity: number,
    headingInDegrees: number,
    elevationInMetres: number,
    identifiedEnvironment: "highway" | "countryside" | "urban",
    fanEnabled: boolean,
    gps: CarSimGps
};

export type CarSimData = {
    "meta" : {
        "timestamp" : string,
        "uuid":string
    },
    "licence" : string,
    "carState" : CarSimState,
    "sensorReadings": CarSimSensorReading[]
}

export class CarSimDataGenerator {
    public licencePlate: string;
    public id: string;

    constructor(licencePlate: string, id: string) {
        this.licencePlate = licencePlate;
        this.id=id
    }

    randInt(min, max):number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    generateIndicators() {
        switch (this.randInt(1,5)) {
            case 1:
                return {
                    "signalL":true,
                    "signalR":false
                };
                break;
            case 2:
                return {
                    "signalL":false,
                    "signalR":true
                };
                break;
            case 3:
            case 4:
            case 5:
                return {
                    "signalL":false,
                    "signalR":false
                };
                break;
        }
    }

    randBool():boolean {
        return this.randInt(0,1) == 0 ? true : false;
    }

    generateCarState():CarSimState {
        let carSimState:CarSimState={
            signal: this.generateIndicators(),
            brakePressure:this.randInt(0,20),
            speedInKph: this.randInt(25,120),
            autoPilotEnabled: this.randBool(),
            cruiseControlEnabled: this.randBool(),
            temperatureInCelsius: this.randInt(18,32),
            humidityInRelativeHumidity: this.randInt(20,70),
            headingInDegrees: this.randInt(0,2),// all cars have to basically be going north
            elevationInMetres: this.randInt(100,110),
            identifiedEnvironment: "countryside",
            fanEnabled: this.randBool(),
            gps: {
                lat: 47.603230,
                lon: -122.330276
            }
        };
        return carSimState;
    }

    generateSensorReadings():CarSimSensorReading[] {
        let sensorReadings:CarSimSensorReading[]=[];
        sensorReadings.push({sensorType: "laneDetection",
            timestamp: new Date().toUTCString(),
            sensorId: "L1",
            readingType: "lane",
            readingValue: false});
        return sensorReadings;
    }

    generateCarData():Dictionary {
        let carData:CarSimData = {
            "meta" : {
                "timestamp":new Date().toUTCString(),
                "uuid":this.id,
            },
            "licence":this.licencePlate,
            "carState":this.generateCarState(),
            "sensorReadings":this.generateSensorReadings()
        }
        return carData;
    }
}