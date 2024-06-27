import { TeamMatch } from "../types/teamMatchType";
import { calcMatchResults } from '../functions/functions';

type TeamMatchesProps = {
    matches: TeamMatch[] ;
}

const TeamMatches = (props: TeamMatchesProps) => {
    const teamMatches = props.matches;
    const teamMatchResults = calcMatchResults(props.matches);
    console.log(teamMatches);
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
            {teamMatches.map(match => (
                <div key={match.id}>
                    <div className="flex">
                        <div className="float-left">{match.opposingTeamName}</div>
                        <div className="w-2 h-2 float-right" style={match.matchResult === '1' ? greenBox : match.matchResult === '0' ? grayBox : goldBox}>{match.matchResult === '1' ? "W" : match.matchResult === '0' ? "L" : "T"}</div>
                    </div>
                </div>
            ))} 
        </div>
    )

}
export default TeamMatches;