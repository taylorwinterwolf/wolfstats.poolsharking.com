import { createContext, useContext } from "react";
import useFetchCollection from "../hooks/fetchData";
import { Match } from "../types/matchType";
import { Player } from "../types/playerType";
import { TeamMatch } from "../types/teamMatchType";
import  { DateUpdated } from "../types/dateUpdatedType";

type DataContextTypes = {
    players: Player[];
    teameightmatches: TeamMatch[];
    teamninematches: TeamMatch[];
    groupedEightMatches: { [key: string]: Match[] };
    groupedNineMatches: { [key: string]: Match[] };
    dateupdated: string;
}

const DataContext = createContext<DataContextTypes | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: eightmatches } = useFetchCollection<Match>('eightballmatches');
    const { data: ninematches } = useFetchCollection<Match>('nineballmatches');
    const { data: rawteameightmatches } = useFetchCollection<TeamMatch>('eightballteammatches');
    const { data: rawteamninematches } = useFetchCollection<TeamMatch>('nineballteammatches');
    const { data: players } = useFetchCollection<Player>('players');
    const { data: dateupdatedtimestamp } = useFetchCollection<DateUpdated>('dateupdated');
    
    let dateupdated = '';
    if (dateupdatedtimestamp && dateupdatedtimestamp.length > 0) {
        const epochTime = convertTimestampToEpoch(dateupdatedtimestamp[0].updated);
        dateupdated = convertEpochToDate(epochTime);
    } else {
        console.error('No date updated found');
    }

    function convertEpochToDate(epochTime: number): string {
        const date = new Date(epochTime);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    }

    function convertTimestampToEpoch(timestamp: { seconds: number, nanoseconds: number }): number {
        return new Date(timestamp.seconds * 1000).getTime();
    }

    function sortTeamMatchesByDate(matches: TeamMatch[]): TeamMatch[] {
        return matches.sort((a, b) => {
            const dateA = convertTimestampToEpoch(a.datePlayed);
            const dateB = convertTimestampToEpoch(b.datePlayed);
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

    const value = { groupedEightMatches, groupedNineMatches, players, teameightmatches, teamninematches, dateupdated };
    
    return<DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}

