package io.codechef.ipldashboard.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.codechef.ipldashboard.model.Team;
import io.codechef.ipldashboard.repository.TeamRepository;
import io.codechef.ipldashboard.repository.MatchRepository;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;  
    private MatchRepository matchRepository;


    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team= this.teamRepository.findByTeamName(teamName);
        System.out.println(team);
        team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName, 4));
        System.out.println(team.getTotalMatches());
        return team;
    }

}
