import { Match } from '../types/matchType';
import { Player } from '../types/playerType';
import { calcMatchResults } from '../functions/functions';
type WinPercentsProps = {
    players: Player[];
    groupedMatches: { [key: string]: Match[] };
    format: string;
}
const WinPercents = (props: WinPercentsProps) => {
    let underline = { borderBottom: '1px solid #222222'};
    if (props.format === 'nine') {
        underline = { borderBottom: '1px solid #e0b900'};
    }
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
    // Put highest winPercent first
    props.players.sort((a, b) => parseFloat(b.winPercent) - parseFloat(a.winPercent));
    return (
        <div>
            {props.players.map((player, index) => (
                <div key={player.id} className={'player-wrapper grid grid-cols-8 ' + (index <= 2 ? 'emphasis' : '')} style={underline}>
                    {props.groupedMatches[player.id] && props.groupedMatches[player.id].length > 0 &&
                        <>
                        <div className='col-span-6'>{player.fname}</div>
                        <div className='col-span-1 text-right'>{player.winPercent}%</div>
                        <div className='col-span-1 text-right'>{player.winsCount}/{player.matchCount}</div>
                        </>
                    }
                </div>
            ))}
        </div>
    );
};
export default WinPercents;



