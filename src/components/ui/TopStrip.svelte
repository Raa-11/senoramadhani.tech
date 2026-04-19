<script lang="ts">
  import { onMount } from 'svelte';

  export let logoSrc: string = '';
  export let backHref: string = '/';
  export let backLabel: string = 'senoramadhani.tech / home';

  let clock = '';
  let localDate = '';
  let visitorCity = '';
  let visitorCountry = '';

  function fmtClock(d: Date) {
    return [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((x) => String(x).padStart(2, '0'))
      .join(':');
  }

  onMount(() => {
    const now = new Date();
    clock = fmtClock(now);
    localDate = now.toLocaleDateString('en-GB', {
      weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    });

    const id = setInterval(() => { clock = fmtClock(new Date()); }, 1000);

    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((d) => { visitorCity = d.city ?? ''; visitorCountry = d.country_name ?? ''; })
      .catch(() => {});

    return () => clearInterval(id);
  });
</script>

<div class="flex justify-between items-center px-1 pb-[18px] pt-2.5 font-mono text-[11px] text-muted tracking-[0.04em]">
  <a href={backHref} class="inline-flex items-center gap-2 text-ink font-semibold no-underline">
    {#if logoSrc}
      <img
        src={logoSrc}
        alt="R"
        class="w-[22px] h-[22px] object-contain"
        style="filter: drop-shadow(0 0 10px color-mix(in oklab, var(--accent) 40%, transparent))"
      />
    {/if}
    {backLabel}
  </a>
  <div class="flex gap-3.5 items-center">
    {#if visitorCity}
      <span>◆ {visitorCity}, {visitorCountry}</span>
      <span>·</span>
    {/if}
    {#if localDate}
      <span>{localDate}</span>
      <span>·</span>
      <span class="tabular-nums">{clock}</span>
    {/if}
  </div>
</div>
