<script lang="ts">
  import Card from '~/components/ui/Card.svelte';
  import CardHead from '~/components/ui/CardHead.svelte';
  import LiveLog from '~/components/ui/LiveLog.svelte';
  import { LOG_LINES } from '~/data/logs';
</script>

<Card>
  <CardHead tag="11" label="// tail -f system.log">
    <div slot="right" class="flex items-center gap-1.5 mr-2">
      <span class="w-2 h-2 rounded-full bg-danger/70"></span>
      <span class="w-2 h-2 rounded-full bg-warn/70"></span>
      <span class="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-bento-pulse"></span>
    </div>
  </CardHead>
  <LiveLog logs={LOG_LINES} max={9} />
</Card>
