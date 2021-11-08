import React from "react";

import { Link } from "react-router-dom";

export const MatchSmallCard = ({ teamName, match }) => {
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    return (
        <div className="MatchSmallCard" >

            <Link to={`/team/${otherTeam}`}>
                <h3> vs {otherTeam}</h3>
                <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
            </Link>
            
        </div>
    );
}

