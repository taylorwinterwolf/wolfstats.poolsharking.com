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
    matchCount: string;
    winsCount: string;
    lossCount: string;
    tiesCount: string;
    winPercent: string;
    lossPercent: string;
    tiePercent: string;
}

interface MatchResult {
    matchResult: string;
}

export function calcMatchResults<T extends MatchResult>(matches: T[]): AllMatchResults {
    const matchCount = matches.length;
    let winsCount = "0";
    let lossCount = "0";
    let tiesCount = "0";
    let winPercent = "0";
    let lossPercent = "0";
    let tiePercent = "0";

    // Calculate counts as numbers first
    const winsNumber = matches.filter(match => match.matchResult === '1').length;
    const lossNumber = matches.filter(match => match.matchResult === '0').length;
    const tiesNumber = matches.filter(match => match.matchResult === '2').length;

    // Convert counts to strings
    winsCount = winsNumber.toString();
    lossCount = lossNumber.toString();
    tiesCount = tiesNumber.toString();

    // Calculate winPercent as a number, then convert to string
    if (matchCount > 0) { // Ensure division by zero is handled
        winPercent = Math.round((winsNumber / matchCount) * 100).toString();
        lossPercent = Math.round((lossNumber / matchCount) * 100).toString();
        tiePercent = Math.round((tiesNumber / matchCount) * 100).toString();
    }

    return { matchCount: matchCount.toString(), winsCount, lossCount, tiesCount, winPercent, lossPercent, tiePercent };
}