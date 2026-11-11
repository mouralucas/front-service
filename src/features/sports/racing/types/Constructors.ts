

export interface ConstructorsResponse {
    constructors: Constructors[];
}

export interface Constructors {
    id: number;
    name: string;
    nationality?: string;
    description: string;
    teamColor?: string;
    teamLogoUrl?: string;
    year: number;
}