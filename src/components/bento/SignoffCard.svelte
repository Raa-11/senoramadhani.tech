<script lang="ts">
  import Card from "~/components/ui/Card.svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
</script>

<Card glow tilt>
  <CardHead tag="12" label="// fin" />

  <div class="flex flex-col justify-between flex-1">
    <div
      class="font-display font-medium leading-[1.02] tracking-[-0.03em] text-ink"
      style="font-size: clamp(28px,4vw,56px)"
    >
      Let&rsquo;s build<br />
      something <span class="font-serif italic text-accent">slow,</span><br />
      careful, and<br />
      <span class="text-accent">hard&nbsp;to&nbsp;break.</span>
    </div>
    <div
      class="font-mono text-[10.5px] mt-auto pt-3.5 border-t border-dashed border-line text-muted"
    >
      © 2026 · seno rama dhani
    </div>
  </div>
</Card>
