import { createContext, useContext } from "react";
import useFetchCollection from "../hooks/fetchData";
import { Match } from "../types/matchType";
import { Player } from "../types/playerType";

type DataContextTypes = {
    eightmatches: Match[];
    ninematches: Match[];
    players: Player[];
}

const DataContext = createContext<DataContextTypes | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: eightmatches } = useFetchCollection<Match>('eightballmatches');
    const { data: ninematches } = useFetchCollection<Match>('nineballmatches');
    const { data: players } = useFetchCollection<Player>('players');

    const value = { eightmatches, ninematches, players };
    
    return<DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}

