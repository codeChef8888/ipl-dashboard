package io.codechef.ipldashboard.repository;


import org.springframework.data.repository.CrudRepository;


import io.codechef.ipldashboard.model.Team;


public interface TeamRepository extends CrudRepository<Team, Long>{

    Team findByTeamName(String teamName);
    
}
