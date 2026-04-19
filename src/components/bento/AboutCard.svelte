<script lang="ts">
  import Card from '~/components/ui/Card.svelte';
  import CardHead from '~/components/ui/CardHead.svelte';

  import { aboutData } from '~/data/about';

  const meta = aboutData.meta;
</script>

<Card tilt>
  <CardHead tag="04" label="// about.md" />

  <div class="flex flex-col gap-3 flex-1">
    <p class="m-0 text-[13.5px] leading-[1.65] text-ink-2">
      {@html aboutData.description}
    </p>

    <div class="mt-auto flex flex-col gap-1.5 pt-3 border-t border-dashed border-line">
      {#each meta as { key, icon, value }}
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.07em] text-accent bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] border border-[color-mix(in_oklab,var(--accent)_25%,transparent)] rounded-[4px] px-[7px] py-[2px] whitespace-nowrap min-w-[90px] justify-center">{icon} {key}</span>
          <span class="text-[12.5px] text-ink-2">{value}</span>
        </div>
      {/each}
    </div>
  </div>
</Card>
