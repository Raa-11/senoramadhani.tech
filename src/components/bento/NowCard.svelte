<script lang="ts">
  import Card from '~/components/ui/Card.svelte';
  import CardHead from '~/components/ui/CardHead.svelte';
  import Counter from '~/components/ui/Counter.svelte';
  import { now } from '~/data/now';

  const today    = new Date();
  const weekAgo  = new Date(today);
  weekAgo.setDate(today.getDate() - 6);

  const careerStart = new Date(2022, 7);
  const yearsExp = Math.floor((today.getTime() - careerStart.getTime()) / (1000 * 60 * 60 * 24 * 365));
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;

  const tagClass: Record<string, string> = {
    wip:  'bg-accent text-accent-on',
    read: 'bg-accent/20 text-accent',
    play: 'bg-line-hi text-ink-2',
    ship: 'bg-ink text-bg',
  };
</script>

<Card tilt>
  <CardHead tag="03" label="// now.log">
    <span slot="right" class="font-mono text-[11px] text-muted">{fmt(weekAgo)} – {fmt(today)}</span>
  </CardHead>

  <div class="flex flex-col gap-0.5 mt-0.5">
    {#each now as item}
      <div class="grid gap-2.5 items-start py-[7px] px-2 rounded-md transition-colors hover:bg-card-hi" style="grid-template-columns: 46px 1fr">
        <span class="font-mono text-[11px] py-0.5 text-center rounded-[3px] font-bold tracking-[0.06em] {tagClass[item.state]}">
          {item.state.toUpperCase()}
        </span>
        <div class="flex flex-col gap-px min-w-0">
          <div class="text-[14px] text-ink leading-[1.35]">{item.t}</div>
          <div class="font-mono text-[12px] text-muted">{item.repo}</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-auto pt-3.5 border-t border-line flex items-end justify-between gap-3.5">
    <div class="font-display font-bold leading-[0.95] tracking-[-0.04em] text-accent" style="font-size: clamp(44px,6vw,72px)">
      <Counter to={yearsExp} delay={300} />+
    </div>
    <div class="font-mono text-[11px] text-right leading-[1.4] text-muted">years shipping<br/>backend systems</div>
  </div>
</Card>
