export interface Contribution {
  type: 'pr' | 'issue';
  title: string;
  repo: string;
  state: 'merged' | 'open' | 'closed';
  url: string;
}

export interface GitHubStats {
  publicRepos: number;
  starsEarned: number;
  contributions: number;
  longestStreak: number;
  heatmap: number[];
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function computeStreak(days: ContributionDay[]): number {
  const sorted = [...days].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  for (const day of sorted) {
    if (day.count > 0) streak++;
    else break;
  }
  return streak;
}

function buildHeatmap(days: ContributionDay[]): number[] {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  // pad to start on Sunday
  const first = new Date(sorted[0]?.date ?? new Date());
  const startDay = first.getDay();
  const cells: number[] = Array(startDay).fill(0);
  for (const d of sorted) cells.push(d.level);
  // pad to 53*7
  while (cells.length < 53 * 7) cells.push(0);
  return cells.slice(0, 53 * 7);
}

export async function fetchContributions(username: string): Promise<Contribution[]> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+is:public+-user:${username}&sort=updated&per_page=10`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  const data = await res.json();
  if (!data.items) return [];

  return data.items.map((item: any) => {
    const isPr = !!item.pull_request;
    const repo = item.repository_url.replace('https://api.github.com/repos/', '');
    let state: 'merged' | 'open' | 'closed' = item.state;
    if (isPr && item.pull_request?.merged_at) state = 'merged';
    return {
      type: isPr ? 'pr' : 'issue',
      title: item.title,
      repo,
      state,
      url: item.html_url,
    };
  });
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const [userRes, reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
  ]);

  const user = await userRes.json();
  const repos = await reposRes.json();
  const contrib = await contribRes.json();

  const starsEarned = Array.isArray(repos)
    ? repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0)
    : 0;

  const days: ContributionDay[] = contrib.contributions ?? [];
  const contributions = days.reduce((sum, d) => sum + d.count, 0);
  const longestStreak = computeStreak(days);
  const heatmap = buildHeatmap(days);

  return {
    publicRepos: user.public_repos ?? 0,
    starsEarned,
    contributions,
    longestStreak,
    heatmap,
  };
}
