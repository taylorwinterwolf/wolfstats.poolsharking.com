export type Match = {
    id: string;
    playerID: number | string;
    playerName: string;
    skillLevel: number | string;
    matchNumber: number | string;
    matchPoints: number | string;
    matchResult: number | string;
    opponentID: number | string;
    opponentMatchPoints: number | string;
    opponentName: number | string;
    opponentSkillLevel: number | string;
    opposingTeamID: number | string;
    sessionID: number | string;
    dateAdded: string;
    datePlayed: string;
    racksWon: number | string;//Only used for 8ball
    pointsWon: number | string;//Only used for 9ball
}
