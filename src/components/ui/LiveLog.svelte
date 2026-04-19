<script lang="ts">
  import { onMount } from "svelte";
  import type { LogEntry } from "~/data/logs";

  export let logs: LogEntry[];
  export let max = 9;
  export let speed = 1300;

  type Line = { id: number; t: string; m: string; ts: Date };

  // Pre-fill so card is never empty on load
  const now = new Date();
  let lines: Line[] = logs
    .slice(0, max)
    .map((l, i) => ({
      ...l,
      id: i,
      ts: new Date(now.getTime() - (max - i) * 2000),
    }));
  let idx = max;
  let cursorVisible = true;

  onMount(() => {
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const ln = { ...logs[idx % logs.length], id: idx, ts: new Date() };
      idx++;
      lines = [...lines, ln].slice(-max);
      tid = setTimeout(tick, speed + Math.random() * 600);
    };
    tid = setTimeout(tick, speed + Math.random() * 600);

    const blink = setInterval(() => {
      cursorVisible = !cursorVisible;
    }, 530);
    return () => {
      clearTimeout(tid);
      clearInterval(blink);
    };
  });

  const fmt = (d: Date) =>
    [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((x) => String(x).padStart(2, "0"))
      .join(":");

  const levelColor: Record<string, string> = {
    INFO: "text-accent",
    WARN: "text-warn",
    DEBUG: "text-muted",
    ERROR: "text-danger",
  };
  const levelBg: Record<string, string> = {
    INFO: "bg-accent/10",
    WARN: "bg-warn/10",
    DEBUG: "bg-line-hi",
    ERROR: "bg-danger/10",
  };

  function parseMsg(
    m: string,
  ): Array<{ text: string; kv: boolean; key: boolean }> {
    const parts: Array<{ text: string; kv: boolean; key: boolean }> = [];
    const regex = /(\w[\w./:-]*)(=)([\w./%:+\-]+)/g;
    let last = 0,
      match;
    while ((match = regex.exec(m)) !== null) {
      if (match.index > last)
        parts.push({ text: m.slice(last, match.index), kv: false, key: false });
      parts.push({ text: match[1], kv: true, key: true });
      parts.push({ text: "=", kv: false, key: false });
      parts.push({ text: match[3], kv: true, key: false });
      last = match.index + match[0].length;
    }
    if (last < m.length)
      parts.push({ text: m.slice(last), kv: false, key: false });
    return parts;
  }
</script>

<div
  class="relative flex flex-col flex-1 overflow-hidden font-mono text-[11.5px] min-h-0"
>
  <!-- top fade for scroll-off effect -->
  <div
    class="absolute inset-x-0 top-0 h-5 bg-linear-to-b from-card to-transparent z-10 pointer-events-none"
  ></div>

  <div class="flex flex-col gap-[5px]">
    {#each lines as l (l.id)}
      <div
        class="grid items-baseline gap-x-2.5 animate-bento-slideUp leading-snug"
        style="grid-template-columns: 56px 46px 1fr"
      >
        <span class="text-muted text-[10px] tabular-nums">{fmt(l.ts)}</span>

        <span
          class="text-[9px] px-[5px] py-[1.5px] rounded-[2px] text-center font-bold tracking-[0.06em] {levelColor[
            l.t
          ]} {levelBg[l.t]}"
        >
          {l.t}
        </span>

        <span class="text-ink-2 leading-[1.35]">
          {#each parseMsg(l.m) as part}
            {#if part.key}
              <span class="text-ink/60">{part.text}</span>
            {:else if part.kv}
              <span class="text-accent/80">{part.text}</span>
            {:else}
              {part.text}
            {/if}
          {/each}
        </span>
      </div>
    {/each}

    <!-- blinking cursor -->
    <div
      class="grid items-baseline gap-x-2.5 mt-0.5"
      style="grid-template-columns: 56px 46px 1fr"
    >
      <span class="text-muted text-[10px] tabular-nums opacity-0">00:00:00</span
      >
      <span></span>
      <span
        class="text-accent/70 text-[12px] leading-none"
        style="opacity: {cursorVisible ? 1 : 0}">█</span
      >
    </div>
  </div>
</div>
