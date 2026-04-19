<script lang="ts">
  import Card from '~/components/ui/Card.svelte';
  import CardHead from '~/components/ui/CardHead.svelte';
  import { githubData } from '~/data/github';

  const g = githubData;
  const repos = g.pinnedRepos;
  const isOdd = repos.length % 2 !== 0;
</script>

<Card>
  <CardHead tag="09" label="// pinned.repos" />

  <div class="grid grid-cols-2 gap-2 flex-1">
    {#each repos as r, i}
      <div class="group px-3.5 py-3 bg-card-hi border border-line rounded-lg flex flex-col gap-1.5 transition-all duration-200 hover:border-accent {isOdd && i === repos.length - 1 ? 'col-span-2' : ''}">
        <div class="flex items-center justify-between gap-2 min-w-0">
          <span class="font-mono text-[13px] font-semibold text-ink truncate">{r.name}</span>
          <span class="font-mono text-[11px] text-muted shrink-0">★ {r.stars}</span>
        </div>

        <div class="text-[12px] text-muted leading-[1.4] flex-1">{r.description}</div>

        <div class="flex items-center gap-3 font-mono text-[10.5px] text-muted mb-1">
          {#each r.langs as l}
            <span class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full shrink-0" style="background: {l.color}"></span>
              {l.name}
            </span>
          {/each}
        </div>

        <div class="flex gap-1.5 mt-auto pt-2 border-t border-dashed border-line">
          <a href={`https://github.com/${g.username}/${r.name}`} target="_blank" rel="noopener"
             class="flex-1 text-center font-mono text-[10px] px-2 py-1 rounded-md border border-line bg-card hover:border-accent hover:text-accent text-muted transition-colors no-underline">
            GitHub ↗
          </a>
          {#if r.url}
            <a href={r.url} target="_blank" rel="noopener"
               class="flex-1 text-center font-mono text-[10px] px-2 py-1 rounded-md border border-accent/30 bg-accent/10 hover:bg-accent/20 text-accent transition-colors no-underline">
              {r.url.includes('crates.io') ? 'crates.io ↗' : 'website ↗'}
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</Card>
