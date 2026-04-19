<script lang="ts">
  import { onMount } from 'svelte';

  export let to       = 0;
  export let duration = 1200;
  export let delay    = 0;
  export let suffix   = '';

  let n = 0;

  onMount(() => {
    let raf: number;
    const startAt = performance.now() + delay;
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - startAt) / duration));
      const e = 1 - Math.pow(1 - p, 3);
      n = Math.round(to * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
</script>

{n.toLocaleString()}{suffix}
