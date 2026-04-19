<script lang="ts">
  import { onMount } from "svelte";
  import Card from "~/components/ui/Card.svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
  import { githubData } from "~/data/github";
  import { fetchContributions, type Contribution } from "~/lib/github";

  const username = githubData.username;

  let contributions: Contribution[] = githubData.contributions.map((c) => ({
    type: c.type,
    title: c.title,
    repo: c.repo,
    state: c.state,
    url: `https://github.com/${c.repo}`,
  }));

  onMount(async () => {
    try {
      const data = await fetchContributions(username);
      if (data.length > 0) contributions = data;
    } catch (e) {}
  });

  function repoParts(repo: string) {
    const [owner, name] = repo.split("/");
    return { owner, name };
  }
</script>

<Card>
  <CardHead tag="10" label="// contributions" />

  <ul class="list-none p-0 m-0 flex flex-col gap-1.5 flex-1">
    {#each contributions.slice(0, 5) as c}
      {@const { owner, name } = repoParts(c.repo)}
      <li>
        <a
          href={c.url}
          target="_blank"
          rel="noopener"
          class="block p-[10px] rounded-lg border border-transparent text-decoration-none transition-all duration-150 hover:bg-card-hi hover:border-line"
        >
          <!-- top row -->
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="{c.type === 'pr'
                ? 'bg-accent text-accent-on'
                : 'bg-card-hi text-ink border border-line-hi'} font-mono text-[9px] font-bold tracking-[0.06em] px-1.5 py-0.5 rounded shrink-0"
              >{c.type === "pr" ? "PR" : "ISS"}</span
            >
            <span class="text-ink text-[12.5px] leading-snug truncate flex-1"
              >{c.title}</span
            >
            <span
              class="{c.state === 'merged'
                ? 'bg-purple-500/20 text-purple-300'
                : c.state === 'open'
                  ? 'bg-accent/15 text-accent'
                  : 'bg-red-500/15 text-red-300'} font-mono text-[9px] font-semibold tracking-[0.05em] uppercase px-1.5 py-0.5 rounded-full shrink-0"
              >{c.state}</span
            >
          </div>
          <!-- bottom row -->
          <div class="flex items-center gap-1 mt-1 pl-[34px]">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-muted shrink-0"
            >
              <path
                d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.36 1.08 2.93.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.54 9.54 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.35 4.7-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
              />
            </svg>
            <span class="font-mono text-[10px] text-muted">{owner}</span>
            <span class="font-mono text-[10px] text-muted opacity-40">/</span>
            <span class="font-mono text-[10px] text-muted font-semibold"
              >{name}</span
            >
          </div>
        </a>
      </li>
    {/each}
  </ul>
</Card>
