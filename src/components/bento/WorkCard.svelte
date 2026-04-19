<script lang="ts">
  import Card from "~/components/ui/Card.svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
  import { work } from "~/data/work";

  const w = work[0];

  const start = new Date(2022, 7);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const duration = years > 0 ? `${years}y ${rem}mo` : `${rem}mo`;
</script>

<Card>
  <CardHead tag="05" label="// work.experience">
    <span slot="right" class="font-mono text-[11px] text-accent"
      >{w.start} — {w.end}</span
    >
  </CardHead>

  <div class="flex gap-3.5 items-center">
    <div
      class="w-11 h-11 rounded-lg overflow-hidden bg-card-hi border border-line shrink-0 flex items-center justify-center"
    >
      <img src={w.logo} alt={w.company} class="w-full h-full object-cover" />
    </div>
    <div>
      <div class="font-display text-[18px] font-semibold tracking-[-0.01em]">
        {w.position}
      </div>
      <div class="font-mono text-[11px] text-muted mt-0.5">
        {w.company} · {w.type} · {w.location}
      </div>
    </div>
  </div>

  <p class="text-[14px] text-ink-2 leading-[1.6] my-0.5">{w.summary}</p>

  <ul
    class="m-0 pl-4 text-[13.5px] text-ink-2 flex flex-col gap-1.5 leading-[1.55] list-none"
  >
    {#each w.highlights as h}
      <li class="flex gap-2">
        <span class="text-accent shrink-0">›</span>
        <span>{h}</span>
      </li>
    {/each}
  </ul>

  <div
    class="mt-auto pt-3 border-t border-dashed border-line flex items-center justify-between"
  >
    <a
      href="https://www.telkomsigma.co.id"
      target="_blank"
      rel="noopener"
      class="font-mono text-[11px] text-accent no-underline transition-colors hover:underline"
      style="text-underline-offset: 3px">telkomsigma.co.id ↗</a
    >
    <span
      class="font-mono text-[11px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
      >{duration}</span
    >
  </div>
</Card>
