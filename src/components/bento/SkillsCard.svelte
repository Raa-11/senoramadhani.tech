<script lang="ts">
  import { githubData, skillIconMap, skillColoredMap } from "~/data/github";

  const { skills } = githubData;

  const row1 = [...skills.language, ...skills.backend];
  const row2 = [...skills.frontend, ...skills.devops];
</script>

<div class="w-full py-3">
  <div
    class="flex flex-col gap-3 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
  >
    <div class="overflow-hidden">
      <div
        class="animate-skills-fwd [animation-duration:28s] hover:[animation-play-state:paused] flex items-center gap-2 w-max"
      >
        {#each [...row1, ...row1] as s}
          <span
            class="inline-flex items-center gap-1.5 px-3 py-[5px] border border-line rounded-[6px] font-mono text-[13px] font-semibold text-ink-2 whitespace-nowrap bg-card-hi cursor-default transition-[border-color,color] duration-150 hover:border-accent hover:text-accent"
          >
            {#if skillIconMap[s]}
              <img
                src="https://cdn.simpleicons.org/{skillIconMap[s]}/000000"
                alt={s}
                width="15"
                height="15"
                class="inline-block shrink-0 dark:invert"
                loading="eager"
              />
            {:else if skillColoredMap[s]}
              <img
                src={skillColoredMap[s]}
                alt={s}
                width="15"
                height="15"
                class="inline-block shrink-0 brightness-0 dark:invert"
                loading="eager"
              />
            {/if}
            <span>{s}</span>
          </span>
        {/each}
      </div>
    </div>

    <div class="overflow-hidden">
      <div
        class="animate-skills-rev [animation-duration:34s] hover:[animation-play-state:paused] flex items-center gap-2 w-max"
      >
        {#each [...row2, ...row2] as s}
          <span
            class="inline-flex items-center gap-1.5 px-3 py-[5px] border border-line rounded-[6px] font-mono text-[13px] font-semibold text-ink-2 whitespace-nowrap bg-card-hi cursor-default transition-[border-color,color] duration-150 hover:border-accent hover:text-accent"
          >
            {#if skillIconMap[s]}
              <img
                src="https://cdn.simpleicons.org/{skillIconMap[s]}/000000"
                alt={s}
                width="15"
                height="15"
                class="inline-block shrink-0 dark:invert"
                loading="eager"
              />
            {:else if skillColoredMap[s]}
              <img
                src={skillColoredMap[s]}
                alt={s}
                width="15"
                height="15"
                class="inline-block shrink-0 brightness-0 dark:invert"
                loading="eager"
              />
            {/if}
            <span>{s}</span>
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>
