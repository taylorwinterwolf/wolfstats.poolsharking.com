import { Match } from '../types/matchType';

export function groupMatchesByPlayerID(matches: Match[]): { [key: string]: Match[] } {
    return matches.reduce((acc, match) => {
        if (!acc[match.playerID]) {
            acc[match.playerID] = [];
        }
        acc[match.playerID].push(match);
        return acc;
    }, {} as { [key: string]: Match[] });
}

type AllMatchResults = {
    matchCount: number | string;
    winsCount: number | string;
    lossCount: number | string;
    tiesCount: number | string;
    winPercent: number | string;
}

export function calcMatchResults(matches: Match[]): AllMatchResults {
    const matchCount = matches.length;
    let winsCount = 0;
    let lossCount = 0;
    let tiesCount = 0;
    let winPercent = 0;
    
    winsCount = matches.filter(match => match.matchResult === '1').length;
    lossCount = matches.filter(match => match.matchResult === '0').length;
    tiesCount = matches.filter(match => match.matchResult === '2').length;
    winPercent = Math.round((winsCount / matchCount) * 100);
    return { matchCount, winsCount, lossCount, tiesCount, winPercent };
}