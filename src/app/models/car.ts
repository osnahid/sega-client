export interface Car{
    id?:string;
    brand:string;
    color:string;
    driveType:string;
    fuel:string;
    img: string;
    locations?:string[];
    model:string;
    pricing:{duree:string;prices:number[]}[];
    specification:string;
    specifications:string[];
    status: boolean;
    transmission:string;
    type: string;
    year: number;
    economy:{city:number;highway:number};
}