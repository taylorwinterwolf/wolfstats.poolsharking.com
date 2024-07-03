import { createContext, useContext } from "react";
import useFetchCollection from "../hooks/fetchData";
import { Match } from "../types/matchType";
import { Player } from "../types/playerType";
import { TeamMatch } from "../types/teamMatchType";

type DataContextTypes = {
    players: Player[];
    teameightmatches: TeamMatch[];
    teamninematches: TeamMatch[];
    groupedEightMatches: { [key: string]: Match[] };
    groupedNineMatches: { [key: string]: Match[] };
}

const DataContext = createContext<DataContextTypes | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: eightmatches } = useFetchCollection<Match>('eightballmatches');
    const { data: ninematches } = useFetchCollection<Match>('nineballmatches');
    const { data: rawteameightmatches } = useFetchCollection<TeamMatch>('eightballteammatches');
    const { data: rawteamninematches } = useFetchCollection<TeamMatch>('nineballteammatches');
    const { data: players } = useFetchCollection<Player>('players');

    console.log(rawteameightmatches);

    function convertTimestampToDate(timestamp: { seconds: number, nanoseconds: number }): number {
        return new Date(timestamp.seconds * 1000).getTime();
    }

    function sortTeamMatchesByDate(matches: TeamMatch[]): TeamMatch[] {
        return matches.sort((a, b) => {
            const dateA = convertTimestampToDate(a.datePlayed);
            const dateB = convertTimestampToDate(b.datePlayed);
            return dateB - dateA;
        });
    }

    function groupMatchesByPlayerID(matches: Match[]): { [key: string]: Match[] } {
        return matches.reduce((acc, match) => {
            if (!acc[match.playerID]) {
                acc[match.playerID] = [];
            }
            acc[match.playerID].push(match);
            return acc;
        }, {} as { [key: string]: Match[] });
    }

    const groupedEightMatches = groupMatchesByPlayerID(eightmatches);
    const groupedNineMatches = groupMatchesByPlayerID(ninematches);
    const teameightmatches = sortTeamMatchesByDate(rawteameightmatches);
    const teamninematches = sortTeamMatchesByDate(rawteamninematches);

    //console.log(teameightmatches);

    const value = { groupedEightMatches, groupedNineMatches, players, teameightmatches, teamninematches};
    
    return<DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}

