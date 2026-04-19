<script lang="ts">
  export let tag   = '';
  export let label = '';
</script>

<div class="flex items-baseline gap-2.5 pb-3.5 border-b border-dashed border-line mb-1">
  <span class="font-mono text-[10px] font-semibold tracking-[0.06em] bg-accent text-accent-on px-[7px] py-[2px] rounded-[4px]">
    {tag}
  </span>
  <span class="font-mono text-[11px] flex-1 tracking-[0.04em] text-muted">
    {label}
  </span>
  <slot name="right" />
</div>
