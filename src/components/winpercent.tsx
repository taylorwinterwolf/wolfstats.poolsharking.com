import { Match } from '../types/matchType';
import { Player } from '../types/playerType';
import { calcMatchResults } from '../functions/functions';

type WinPercentsProps = {
    players: Player[];
    groupedMatches: { [key: string]: Match[] };
}

const WinPercents = (props: WinPercentsProps) => {

    props.players?.forEach(player => {
        const playerMatches = props.groupedMatches[player.id];
        if (playerMatches && playerMatches.length > 0) {
            const matchResults = calcMatchResults(playerMatches);
            player.matchCount = matchResults.matchCount;
            player.winsCount = matchResults.winsCount;
            player.lossCount = matchResults.lossCount;
            player.tiesCount = matchResults.tiesCount;
            player.winPercent = matchResults.winPercent;
        }
    });
    //console.log(props.players);

    // Put highest winPercent first
    props.players.sort((a, b) => parseFloat(b.winPercent) - parseFloat(a.winPercent));
    
    return (
        <div>
            {props.players.map(player => (
                <div key={player.id}>
                    {props.groupedMatches[player.id] && props.groupedMatches[player.id].length > 0 &&
                        <p>{player.fname} {player.winPercent}% {player.winsCount}/{player.matchCount}</p>
                    }
                </div>
            ))}
        </div>
    );
};

export default WinPercents;



