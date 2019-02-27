// SensorDataModel.ts

export interface SensorDataModel {
    id: number;
    _id: string;
    temp: number;
    hum: number;
    press: number;
    O3: number;
    NO: number;
    NO2: number;
    CO: number;
    SO2: number;
    CO2: number;
    batt: number;
    node: string;
    messageTime: string;
}
