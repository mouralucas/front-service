import { Investment, InvestmentObjective, InvestmentStatement, InvestmentStatementMetadata, InvestmentType } from "./Investment";

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

export interface QueryInvestmentById {
    getInvestmentById: {
        investment: Investment;
    }
}

export interface QueryInvestmentStatementMetadada {
    getStatementMetadata: InvestmentStatementMetadata
}

export interface QueryInvestmentStatement {
    getInvestmentStatement: {
        statement: InvestmentStatement;
    }
}

export interface QueryInvestmentStatements {
    getInvestmentStatements: {
        quantity: number;
        statements: InvestmentStatement[];
    }
}

export interface QueryInvestmentObjective {
    getInvestmentObjectives: {
        quantity: number;
        objectives: InvestmentObjective[];
    }
}

export interface QueryInvestmentType {
    getInvestmentTypes: {
        quantity: number;
        investmentTypes: InvestmentType[];
    }
}

export interface QueryInvestmentPerformance {
    getInvestmentPerformance: {
        investmentSerie: number[];
        indexerSerie: number[];
        indexerName: string;
        periodRange: number[];
    }
}