import { TeamMatch } from "../types/teamMatchType";
import { calcMatchResults } from '../functions/functions';

type TeamMatchesProps = {
    matches: TeamMatch[] ;
}

const TeamMatches = (props: TeamMatchesProps) => {
    const teamMatches = props.matches;
    const teamMatchResults = calcMatchResults(props.matches);
    //console.log(teamMatches);
    console.log(teamMatchResults);

    const grayBox = {
        backgroundColor: '#909090',
    }
    const greenBox = {
        backgroundColor: 'green',
    }
    const goldBox = {
        backgroundColor: 'gold',
    }

    return (
        <div>
            <div>Win% {teamMatchResults.winPercent} Tie% {teamMatchResults.tiePercent} Loss% {teamMatchResults.lossPercent}</div>
            {teamMatches.map(match => (
                <div key={match.id} className="grid grid-cols-10">
                    <div className="col-span-9">{match.opposingTeamName}</div>
                    <div className="col-span-1">
                        <div className="circle" style={match.matchResult === '1' ? greenBox : match.matchResult === '0' ? grayBox : goldBox}></div>
                    </div>
                </div>
            ))} 
        </div>
    )
}
export default TeamMatches;