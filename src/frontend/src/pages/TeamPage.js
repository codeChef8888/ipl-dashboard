import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { PieChart } from 'react-minimal-pie-chart';
import './TeamPage.scss';
export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] });
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
    );

    if (!team || !team.teamName) {
        return <h1>Sorry, Team not found!!!</h1>
    }
    return (
        <div className="TeamPage">

            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>

            <div className="win-loss-section">
                Win or loss
                <PieChart
                    data={[
                        { title: 'losses', value: team.totalMatches - team.totalWins, color: '#C00D0D' },
                        { title: 'wins', value: team.totalWins, color: '#37AC15' }
                        
                    ]}
                />
            </div>

            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
            </div>


            {team.matches.slice(1).map((match) => <MatchSmallCard teamName={team.teamName} match={match} />)}

            <div className="more-link">
                <a href="*">More>></a>
            </div>
        </div>
    );
}

