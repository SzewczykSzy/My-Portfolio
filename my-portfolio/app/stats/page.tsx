"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faCode, faCodePullRequest } from '@fortawesome/free-solid-svg-icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

interface Contribution {
  date: string;
  count: number;
}

const Stats = () => {
  const [overallStats, setOverallStats] = useState<{ repository_count: number; } | null>(null);
  const [commitsAndPrs, setCommitsAndPrs] = useState<{ commit_count: number; pr_count: number; } | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  useEffect(() => {
    fetch('https://my-portfolio-backend-six.vercel.app/api/github_repos')
      .then((response) => response.json())
      .then((data) => setOverallStats(data))
      .catch((error) => console.error('Error fetching GitHub stats:', error));

    fetch('https://my-portfolio-backend-six.vercel.app/api/github_commits_prs')
      .then((response) => response.json())
      .then((data) => setCommitsAndPrs(data))
      .catch((error) => console.error('Error fetching GitHub commits and PRs:', error));

    fetch('https://my-portfolio-backend-six.vercel.app/api/github_contributions')
      .then((response) => response.json())
      .then((data) => {
        setContributions(data);
        const max = Math.max(...data.map((contribution: Contribution) => contribution.count));
        setMaxCount(max);
      })
      .catch((error) => console.error('Error fetching GitHub contributions:', error));
  }, []);


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">GitHub Stats</h1>
      <div className="flex flex-row justify-between space-x-8">
        <div className="stats-item">
          {overallStats !== null ? (
            <div className="text-lg">
              <p><FontAwesomeIcon icon={faCodeBranch} /> Number of repositories: {overallStats.repository_count}</p>
            </div>
          ) : (
            <p className="text-lg">Loading...</p>
          )}
        </div>
        {commitsAndPrs && (
          <>
            <div className="stats-item text-lg">
              <p><FontAwesomeIcon icon={faCode} /> Number of commits: {commitsAndPrs.commit_count}</p>
            </div>
            <div className="stats-item text-lg">
              <p><FontAwesomeIcon icon={faCodePullRequest} /> Number of pull requests: {commitsAndPrs.pr_count}</p>
            </div>
          </>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-8">Last Year Contributions</h2>
      <div className="heatmap">
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={contributions}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${Math.ceil(Math.log((value.count) + 1))}`;
          }}
          tooltipDataAttrs={(value: Contribution | undefined) => {
            if (!value) {
              return {};
            }
            return {
              'data-tip': `${value.date} has ${value.count} contributions`
            };
          }}
          showWeekdayLabels={true}
          onMouseLeave={() => ReactTooltip.hide()}
        />
        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
    </div>
  );
};

export default Stats;
