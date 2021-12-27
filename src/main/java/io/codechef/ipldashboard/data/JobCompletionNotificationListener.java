package io.codechef.ipldashboard.data;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.codechef.ipldashboard.model.Team;

@Component
@Transactional
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final EntityManager em;

  @Autowired
  public JobCompletionNotificationListener(EntityManager em) {
    this.em = em;
  }

  @Override
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      // Checking the uploading of data to HSQL
      // jdbcTemplate.query("SELECT team1, team2, date FROM match",
      // (rs, row) -> "Team1" + rs.getString(1)+ "Team2" + rs.getString(2)+ "date" +
      // rs.getString(3)
      // ).forEach(str -> System.out.println(str));

      Map<String, Team> teamData = new HashMap<>();

      // createQuery returns : List<Object[]>

      em.createQuery("select m.team1 , count(*) from Match m group by m.team1", Object[].class)
      .getResultList().stream()
          .map(e -> new Team((String) e[0], (Long) e[1])).forEach((team) -> teamData.put(team.getTeamName(), team));

      em.createQuery("select m.team2 , count(*) from Match m group by m.team2", Object[].class)
      .getResultList().stream()
          .forEach(e -> {
            Team team = teamData.get((String) e[0]);
            if (team != null) team.setTotalMatches(team.getTotalMatches() + (Long) e[1]);
          });

      em.createQuery("select m.matchWinner , count(*) from Match m group by m.matchWinner", Object[].class)
          .getResultList().stream().forEach(e -> {
            Team team = teamData.get((String) e[0]);
            if (team != null)
              team.setTotalWins((Long) e[1]);
          });

      teamData.values().forEach(team -> em.persist(team));

      // thorough check
      // teamData.values().forEach(team->System.out.println(team));

    }

  }
}
