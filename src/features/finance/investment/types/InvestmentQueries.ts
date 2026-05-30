import { Investment, InvestmentObjective } from "./Investment";

/*
    This file contains the types for the queries related to investments, 
        such as fetching investment objectives, transactions, etc.
*/
export interface QueryInvestment {
    getInvestments: {
        quantity: number;
        investments: Investment[];
    }
}


export interface QueryInvestmentObjective {
    getInvestmentObjectives: {
        quantity: number;
        objectives: InvestmentObjective[];
    }
}