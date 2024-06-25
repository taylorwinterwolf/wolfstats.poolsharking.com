import useFetchCollection from '../hooks/fetchData';
import { EightBallMatch } from '../types/eightBallMatchType';
import { Player } from '../types/playerType';
import { groupMatchesByPlayerID, calcEightWinPercents } from '../functions/functions';

const EightBallWinPercents = () => {
    const { data: players } = useFetchCollection<Player>('players');
    const { data: matches } = useFetchCollection<EightBallMatch>('eightballmatches');
    const groupedMatches = groupMatchesByPlayerID(matches);

    players?.forEach(player => {
        const playerMatches = groupedMatches[player.id];
        const matchResults = calcEightWinPercents(playerMatches);
        player.winPercent = matchResults.winPercent;
        player.totalMatches = matchResults.total;
        player.totalWins = matchResults.winsCount;
    });

    // console.log(players);
    // console.log(groupedMatches);

    return (
        <div>
            <p>Win Percent:</p>
            {players.map(player => (
                <div key={player.id}>
                    <p>{player.completeName} {player.winPercent}% {player.totalWins}/{player.totalMatches}</p>
                </div>
            ))}
        </div>
    );
};

export default EightBallWinPercents;



