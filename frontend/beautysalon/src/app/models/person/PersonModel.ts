import { HairColor } from "../enums/HairColorEnum";
import { HairLength } from "../enums/HairLengthEnum";

export interface Person {
    id: string;
    name: string;
    age: number;
    hairColor: HairColor;
    hairLength: HairLength;
    hairDescription: string;
    selected?: boolean;
}