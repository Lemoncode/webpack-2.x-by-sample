import {getAvg} from "./averageService";

const scores: number[] = [90, 75, 60, 99, 94, 30];
const averageScore: number = getAvg(scores);

const messageToDisplay: string = `average score ${averageScore}`;

document.write(messageToDisplay);
