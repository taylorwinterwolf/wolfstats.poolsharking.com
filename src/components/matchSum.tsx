import { Match } from '../types/matchType';
import { Player } from '../types/playerType';
import { getSumMatches } from '../functions/functions';

type MatchSumProps = {
    players: Player[];
    groupedMatches: { [key: string]: Match[] };
    category: string;
    format: string;
}

const MatchSum = (props: MatchSumProps) => {
    let underline = { borderBottom: '1px solid #222222' };
    if (props.format === 'nine') {
        underline = { borderBottom: '1px solid #e0b900' };
    }
    props.players?.forEach(player => {
        const playerMatches = props.groupedMatches[player.id];
        if (playerMatches && playerMatches.length > 0) {
            const matchSums = getSumMatches(playerMatches);
            player.sumMatchPoints = matchSums.sumMatchPoints;
            player.sumPointsMade = matchSums.sumPointsMade;
            player.sumRacksWon = matchSums.sumRacksWon;
        }
    });
    //console.log(props.players);

    let playersSum = props.players;

    // Put highest sumMatchPoints at the top
    if (props.category === 'matchPoints') {
        playersSum = props.players.sort((a, b) => parseFloat(b.sumMatchPoints) - parseFloat(a.sumMatchPoints));    
    } else if (props.category === 'racksWon') {
        playersSum = props.players.sort((a, b) => parseFloat(b.sumRacksWon) - parseFloat(a.sumRacksWon));
    } else if (props.category === 'pointsMade') {
        playersSum = props.players.sort((a, b) => parseFloat(b.sumPointsMade) - parseFloat(a.sumPointsMade));
    }
    
    return (
        <div>
            {playersSum.map((player, index) => (
                <div key={player.id} className={'player-wrapper grid grid-cols-8 ' + (index <= 2 ? 'emphasis' : '')} style={underline}>
                    {props.groupedMatches[player.id] && props.groupedMatches[player.id].length > 0 &&
                        <>
                            <div className='col-span-7'>{player.fname}</div>
                            <div className='col-span-1 text-right'>{props.category === 'matchPoints' ? player.sumMatchPoints : (props.category === 'racksWon' ? player.sumRacksWon : (props.category === 'pointsMade' ? player.sumPointsMade : null))}</div>
                        </>
                    }
                </div>
            ))}
        </div>
    );
};

export default MatchSum;



