<script lang="ts">
  import { onMount } from "svelte";
  import { theme, toggleTheme } from "~/stores/theme";

  const MAG = 54,
    BASE = 40,
    DIST = 110;
  let path = typeof window !== "undefined" ? window.location.pathname : "/";

  const item = (active = false) =>
    [
      "dock-item relative inline-flex w-10 h-10 items-center justify-center rounded-full",
      "border-0 cursor-pointer no-underline shrink-0 bg-transparent",
      "[transition:width_0.18s_cubic-bezier(0.2,0.7,0.2,1),height_0.18s_cubic-bezier(0.2,0.7,0.2,1),background_0.18s_ease,color_0.18s_ease]",
      active
        ? "text-accent bg-accent/12"
        : "text-muted hover:text-accent hover:bg-accent/12",
    ].join(" ");

  const svg =
    "w-[18px] h-[18px] [transition:width_0.18s_ease,height_0.18s_ease]";

  onMount(() => {
    const dock = document.getElementById("bento-dock");
    const items = dock
      ? Array.from(dock.querySelectorAll<HTMLElement>(".dock-item"))
      : [];

    const onMove = (e: MouseEvent) => {
      items.forEach((el) => {
        const cx =
          el.getBoundingClientRect().left +
          el.getBoundingClientRect().width / 2;
        const d = Math.abs(e.clientX - cx);
        const sz = d > DIST ? BASE : BASE + (MAG - BASE) * (1 - d / DIST);
        el.style.width = el.style.height = sz + "px";
        el.querySelectorAll<SVGElement>("svg").forEach((s) => {
          s.style.width = s.style.height = 18 + (sz - BASE) * 0.35 + "px";
        });
      });
    };

    const onLeave = () => {
      items.forEach((el) => {
        el.style.width = el.style.height = BASE + "px";
        el.querySelectorAll<SVGElement>("svg").forEach((s) => {
          s.style.width = s.style.height = "18px";
        });
      });
    };

    const onSwap = () => {
      path = window.location.pathname;
    };

    dock?.addEventListener("mousemove", onMove);
    dock?.addEventListener("mouseleave", onLeave);
    document.addEventListener("astro:after-swap", onSwap);
    return () => {
      dock?.removeEventListener("mousemove", onMove);
      dock?.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("astro:after-swap", onSwap);
    };
  });
</script>

<!-- Dock fade -->
<div
  class="fixed inset-x-0 bottom-0 h-24 pointer-events-none z-40"
  style="background: linear-gradient(to top, var(--bg) 40%, transparent)"
></div>

<!-- Dock -->
<nav
  class="fixed inset-x-0 bottom-12 z-50 flex justify-center pointer-events-none"
  aria-label="Primary"
>
  <div
    id="bento-dock"
    class="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full border border-line-hi backdrop-blur-xl"
    style="background: color-mix(in oklab, var(--card) 90%, transparent); box-shadow: 0 20px 40px -12px rgba(0,0,0,.6), inset 0 1px 0 color-mix(in oklab, var(--ink) 6%, transparent)"
  >
    <a class={item(path === "/")} href="/" data-label="Home" aria-label="Home">
      <svg
        class={svg}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v10h14V10" /><path
          d="M10 20v-5h4v5"
        />
      </svg>
    </a>
    <a
      class={item(path.startsWith("/blog"))}
      href="/blog"
      data-label="Blog"
      aria-label="Blog"
    >
      <svg
        class={svg}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" /><path
          d="M4 17a3 3 0 0 1 3-3h11"
        /><path d="M8 8h7M8 11h5" />
      </svg>
    </a>

    <span class="w-px h-5 bg-line-hi mx-1 shrink-0"></span>

    <a
      class={item()}
      href="https://github.com/Raa-11"
      target="_blank"
      rel="noopener"
      data-label="GitHub"
      aria-label="GitHub"
    >
      <svg class={svg} viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.36 1.08 2.93.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.54 9.54 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.35 4.7-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
        />
      </svg>
    </a>
    <a
      class={item()}
      href="https://www.linkedin.com/in/seno-rama-dhani-6a8775232/"
      target="_blank"
      rel="noopener"
      data-label="LinkedIn"
      aria-label="LinkedIn"
    >
      <svg class={svg} viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9.5h4V21H3V9.5zm7 0h3.8v1.56h.06c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.1c0-1.22-.02-2.78-1.69-2.78-1.69 0-1.95 1.32-1.95 2.69V21h-4V9.5z"
        />
      </svg>
    </a>
    <a
      class={item()}
      href="mailto:contact@senoramadhani.com"
      data-label="Email"
      aria-label="Email"
    >
      <svg
        class={svg}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" /><path
          d="m3 7 9 6 9-6"
        />
      </svg>
    </a>

    <a
      class={item()}
      href="/Seno%20Rama%20Dhani%20CV.pdf"
      download="Seno Rama Dhani CV.pdf"
      data-label="Resume"
      aria-label="Download Resume"
    >
      <svg
        class={svg}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3v12M7 8l5 5 5-5M4 21h16" />
      </svg>
    </a>

    <span class="w-px h-5 bg-line-hi mx-1 shrink-0"></span>

    <button
      class={item()}
      data-label="Theme"
      aria-label="Toggle theme"
      on:click={toggleTheme}
    >
      {#if $theme === "dark"}
        <svg
          class={svg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" /><path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
          />
        </svg>
      {:else}
        <svg
          class={svg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      {/if}
    </button>
  </div>
</nav>

<style>
  .dock-item::after {
    content: attr(data-label);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    padding: 4px 8px;
    background: var(--ink);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }
  .dock-item:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>
