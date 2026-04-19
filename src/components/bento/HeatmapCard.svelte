<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '~/components/ui/Card.svelte';
  import CardHead from '~/components/ui/CardHead.svelte';
  import Counter from '~/components/ui/Counter.svelte';
  import Heatmap from '~/components/ui/Heatmap.svelte';
  import { githubData as github } from '~/data/github';
  import { fetchGitHubStats } from '~/lib/github';

  const username = github.username;

  let publicRepos  = github.stats[0].num;
  let contributions = github.stats[1].num;
  let longestStreak = github.stats[2].num;
  let starsEarned  = github.stats[3].num;
  let heatmap      = github.heatmap;
  let loaded       = false;

  onMount(async () => {
    try {
      const data = await fetchGitHubStats(username);
      publicRepos   = data.publicRepos;
      contributions = data.contributions;
      longestStreak = data.longestStreak;
      starsEarned   = data.starsEarned;
      heatmap       = data.heatmap;
      loaded        = true;
    } catch (e) {
      loaded = true;
    }
  });

  $: stats = [
    { label: 'Public repos',         num: publicRepos,   suffix: ''       },
    { label: 'Contributions (12mo)', num: contributions, suffix: ''       },
    { label: 'Longest streak',       num: longestStreak, suffix: ' days'  },
    { label: 'Stars earned',         num: starsEarned,   suffix: ''       },
  ];
</script>

<Card>
  <CardHead tag="08" label={`// @${username}/activity`}>
    <a slot="right" href={`https://github.com/${username}`} target="_blank" rel="noopener"
       class="font-mono text-[11px] text-accent hover:underline">github ↗</a>
  </CardHead>

  <div class="grid gap-2 grid-cols-4">
    {#each stats as s, i}
      <div class="px-3 py-2.5 bg-card-hi rounded-lg border border-line">
        <div class="font-display font-bold leading-none tracking-[-0.02em] text-accent text-[clamp(18px,2vw,26px)]">
          {#key s.num}
            <Counter to={s.num} delay={200 + i * 120} />{s.suffix}
          {/key}
        </div>
        <div class="font-mono text-[10px] mt-1.5 uppercase tracking-[0.06em] text-muted">{s.label}</div>
      </div>
    {/each}
  </div>

  <Heatmap cells={heatmap} />
</Card>
