export type TeamMatch = {
    id: string;
    matchResult: string,
    matchPoints: string,
    opposingTeamName: string,
    opposingTeamPoints: string,
    opposingTeamID: string,
    sessionID: string,
    dateAdded: {seconds: number, nanoseconds: number},
    datePlayed: { seconds: number, nanoseconds: number },
}