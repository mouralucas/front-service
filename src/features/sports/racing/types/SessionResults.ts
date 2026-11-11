
export interface SessionResultsResponse {
    eventId: number;
    eventName: string;
    eventOfficialName?: string;
    eventStartDate: string;
    eventEndDate: string;
    sessionId: number;
    sessionName: string;
    result: SessionResults[];
}

export interface SessionResults {
    id: number;
    eventName: string;
    sessionName: string;
    position: number;
    lastName: string;
    constructorId: number;
    constructorName: string;
    laps: number;
    raceTime: string;
    gap: string;
    raceStatus: string;
}