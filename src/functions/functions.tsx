import { EightBallMatch } from '../types/eightBallMatchType';

export function groupMatchesByPlayerID(matches: EightBallMatch[]): { [key: string]: EightBallMatch[] } {
    return matches.reduce((acc, match) => {
        if (!acc[match.playerID]) {
            acc[match.playerID] = [];
        }
        acc[match.playerID].push(match);
        return acc;
    }, {} as { [key: string]: EightBallMatch[] });
}

type WinPercentResult = {
    total: number | string;
    winsCount: number | string;
    winPercent: number | string;
}

export function calcEightWinPercents(matches: EightBallMatch[]): WinPercentResult {
    const total = matches.length;
    const winsCount = matches.filter(match => match.matchResult === '1').length;
    const winPercent = Math.round((winsCount / total) * 100);
    return { total, winsCount, winPercent };
}
