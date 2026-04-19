<script lang="ts">
  import Card from "~/components/ui/Card.svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
  import { educationData } from "~/data/education";

  const e = educationData[0];
  const gpaNum = parseFloat(e.gpa);
  const gpaMax = parseFloat(e.gpaMax);
  const gpaPct = (gpaNum / gpaMax) * 100;
</script>

<Card tilt>
  <CardHead tag="07" label="// education">
    <a
      slot="right"
      href="https://www.unikom.ac.id"
      target="_blank"
      rel="noopener"
      class="font-mono text-[10px] text-accent no-underline transition-colors duration-150 hover:underline hover:underline-offset-[3px]"
    >
      unikom.ac.id ↗
    </a>
  </CardHead>

  <!-- School info -->
  <div class="flex items-center gap-3">
    <div
      class="w-[42px] h-[42px] rounded-[10px] overflow-hidden border border-(--line-hi) bg-(--card-hi) shrink-0"
    >
      <img src={e.logo} alt={e.school} class="w-full h-full object-cover" />
    </div>
    <div class="min-w-0 flex-1">
      <div
        class="font-display text-[15px] font-bold tracking-[-0.02em] leading-snug text-ink"
      >
        {e.degree}
      </div>
      <div class="font-mono text-[10.5px] text-muted mt-0.5 truncate">
        {e.school}
      </div>
      <div class="font-mono text-[10px] text-muted mt-0.5">{e.period}</div>
    </div>
  </div>

  <!-- GPA + link -->
  <div
    class="mt-auto pt-3 border-t border-dashed border-line flex flex-col gap-2"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-baseline gap-1.5">
        <span
          class="font-display text-[22px] font-bold tracking-[-0.03em] text-ink leading-none"
          >{gpaNum.toFixed(2)}</span
        >
        <span class="font-mono text-[10px] text-muted"
          >/ {gpaMax.toFixed(2)}</span
        >
      </div>
      <span
        class="font-mono text-[9.5px] font-semibold uppercase tracking-[0.07em] text-accent bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] rounded-full px-[8px] py-[2px]"
        >{e.honors}</span
      >
    </div>
    <div class="h-[4px] rounded-full bg-(--card-hi) overflow-hidden">
      <div
        class="h-full rounded-full bg-(--accent)"
        style="width:{gpaPct}%"
      ></div>
    </div>
    <span class="font-mono text-[9.5px] text-muted uppercase tracking-[0.06em]"
      >Grade Point Average</span
    >
  </div>
</Card>
