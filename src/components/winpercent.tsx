import useFetchCollection from '../hooks/fetchData';
import { Match } from '../types/matchType';
import { Player } from '../types/playerType';
import { groupMatchesByPlayerID, calcMatchResults } from '../functions/functions';

type WinPercentsProps = {
    format: string;
    headerName: string;
}

const WinPercents = (props: WinPercentsProps) => {
    let collectionName = 'eightballmatches';
    if (props.format === 'nineball'){
        collectionName = 'nineballmatches';
    }
    const { data: matches } = useFetchCollection<Match>(collectionName);
    const { data: players } = useFetchCollection<Player>('players');
    const groupedMatches = groupMatchesByPlayerID(matches);

    players?.forEach(player => {
        const playerMatches = groupedMatches[player.id];
        const matchResults = calcMatchResults(playerMatches);
        player.matchCount = matchResults.matchCount;
        player.winsCount = matchResults.winsCount;
        player.lossCount = matchResults.lossCount;
        player.tiesCount = matchResults.tiesCount;
        player.winPercent = matchResults.winPercent;
    });

    console.log(groupedMatches);
    console.log(players);

    return (
        <div>
            <p>{props.headerName}</p>
            {players.map(player => (
                <div key={player.id}>
                    <p>{player.completeName} {player.winPercent}% {player.winsCount}/{player.matchCount}</p>
                </div>
            ))}
        </div>
    );
};

export default WinPercents;



