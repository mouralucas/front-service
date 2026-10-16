
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
    eventName: string;
    sessionName: string;
    lastName: string;
    constructorName: string;
    laps: number;
    raceTime: string;
    gap: string;
}