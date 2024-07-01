import { Match } from '../types/matchType';
import { Player } from '../types/playerType';
import { getTheZeros } from '../functions/functions';

type TheZerosProps = {
    players: Player[];
    groupedMatches: { [key: string]: Match[] };
    category: string;
}

const TheZeros = (props: TheZerosProps) => {

    props.players?.forEach(player => {
        const playerMatches = props.groupedMatches[player.id];
        if (playerMatches && playerMatches.length > 0) {
            const theZeros = getTheZeros(playerMatches);
            player.twoZeros = theZeros.twoZeros;
            player.threeZeros = theZeros.threeZeros;
        }
    });

    let playerZeros = props.players;

    // Put highest sumMatchPoints first and then remove players with 0
    if (props.category === 'twoZeros') {
        playerZeros = props.players.sort((a, b) => parseFloat(b.twoZeros) - parseFloat(a.twoZeros)).filter(player => player.twoZeros !== '0');
    } else if (props.category === 'threeZeros') {
        playerZeros = props.players.sort((a, b) => parseFloat(b.threeZeros) - parseFloat(a.threeZeros)).filter(player => player.threeZeros !== '0');
    }

    return (
        <div>
            {playerZeros.map(player => (
                <div key={player.id}>
                    <p>{player.fname} {props.category === 'twoZeros' ? player.twoZeros : (props.category === 'threeZeros' ? player.threeZeros : null)}</p>
                </div>
            ))}
        </div>
    );
};

export default TheZeros;



