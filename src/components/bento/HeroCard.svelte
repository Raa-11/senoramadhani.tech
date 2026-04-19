<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
  import AsciiName from "~/components/ui/AsciiName.svelte";
  import { heroData } from "~/data/hero";

  let mapContainer: HTMLDivElement;
  let map: any;

  let observer: MutationObserver;

  function getTheme() {
    return document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";
  }

  onMount(async () => {
    const center = heroData.coordinates;

    const maplibregl = (await import("maplibre-gl")).default;
    await import("maplibre-gl/dist/maplibre-gl.css");
    await new Promise((r) => requestAnimationFrame(r));

    map = new maplibregl.Map({
      container: mapContainer,
      style:
        getTheme() === "light"
          ? heroData.map.lightStyle
          : heroData.map.darkStyle,
      center,
      zoom: heroData.map.zoom,
      pitch: heroData.map.pitch,
      bearing: heroData.map.bearing,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
      renderWorldCopies: false,
    });

    const addMarker = (maplibre: any) => {
      maplibre.resize();
      const layers = maplibre.getStyle().layers as any[];
      const bldLayer = layers.find(
        (l: any) => l["source-layer"] === "building",
      );
      const src = bldLayer?.source ?? "carto";
      const labelLayer = layers.find(
        (l: any) => l.type === "symbol" && l.layout?.["text-field"],
      );

      if (!maplibre.getLayer("3d-buildings")) {
        maplibre.addLayer(
          {
            id: "3d-buildings",
            source: src,
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 12,
            paint: {
              "fill-extrusion-color":
                getTheme() === "light" ? "#d0cece" : "#1a1a1a",
              "fill-extrusion-height": ["coalesce", ["get", "height"], 6],
              "fill-extrusion-base": ["coalesce", ["get", "min_height"], 0],
              "fill-extrusion-opacity": 0.85,
            },
          },
          labelLayer?.id,
        );
      }

      try {
        maplibre.setPaintProperty(
          "water",
          "fill-color",
          getTheme() === "light" ? "#b8d9d9" : "#0a2020",
        );
      } catch {}

      if (!document.querySelector(".loc-marker")) {
        const el = document.createElement("div");
        el.className = "loc-marker";

        const ring = document.createElement("div");
        ring.className = "loc-ring";

        const person = document.createElement("div");
        person.className = "loc-person";

        // Yoga02Icon inline SVG (from @hugeicons/core-free-icons)
        person.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M7.88598 10C8.57173 11.3968 9.30442 12.7049 9.1352 14.3142C8.86468 16.8869 5.74512 17.8552 3.75022 19.0404C2.44325 19.8169 2.9319 22 4.53582 22C6.48047 22 8.21607 21.8448 9.9706 21.0201L13.4111 18.9028C13.8887 18.6783 14.4913 18.774 15 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
          <path d="M16.0105 10C15.3102 11.3968 14.562 12.7049 14.7348 14.3142C15.0111 16.8869 18.1967 17.8552 20.2339 19.0404C21.5685 19.8169 21.0695 22 19.4316 22C17.4458 22 15.6734 21.8448 13.8817 21.0201L10.3683 18.9028C9.95819 18.714 9.45777 18.7517 9 18.9028" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
          <path d="M10 4C10 5.10457 10.8954 6 12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M3 16C5.44586 16 6.54368 13.2949 6.89335 11.4291C6.98463 10.9421 7.13246 10.4565 7.45625 10.0814C8.55651 8.80674 10.184 8 12 8C13.816 8 15.4435 8.80674 16.5437 10.0814C16.8675 10.4565 17.0154 10.9421 17.1067 11.4291C17.4563 13.2949 18.5541 16 21 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>`;

        el.appendChild(ring);
        el.appendChild(person);

        new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat(center)
          .addTo(maplibre);
      }
    };

    map.on("load", () => addMarker(map));

    observer = new MutationObserver(() => {
      const style =
        getTheme() === "light"
          ? heroData.map.lightStyle
          : heroData.map.darkStyle;
      document.querySelector(".loc-marker")?.remove();
      map.setStyle(style);
      map.once("styledata", () => addMarker(map));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  });

  onDestroy(() => {
    observer?.disconnect();
    map?.remove();
  });
</script>

<div
  class="group relative rounded-[14px] bg-card border border-line overflow-hidden flex flex-row h-full hover:border-line-hi transition-colors duration-200"
>
  <!-- Left: identity -->
  <div class="relative z-10 flex flex-col flex-1 gap-3 p-[18px_20px] min-w-0">
    <CardHead tag="01" label="// identity" />
    <AsciiName />
    <div
      class="font-mono text-[10.5px] text-muted tracking-[0.12em] uppercase mt-1.5"
    >
      {@html heroData.formattedName}
    </div>
    <div
      class="mt-auto pt-3.5 border-t border-dashed border-line flex items-center justify-between gap-3 flex-wrap"
    >
      <div class="flex items-center gap-2 font-mono text-[11px] text-muted">
        <span>◆ {heroData.city}, {heroData.country}</span>
      </div>
      <div
        class="flex items-center gap-1.5 px-2.5 py-[5px] rounded-full font-mono text-[10.5px] text-accent shrink-0 bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
      >
        <span
          class="w-1.5 h-1.5 rounded-full bg-accent animate-bento-pulse shrink-0 shadow-[0_0_6px_var(--accent)]"
        ></span>
        {heroData.statusMessage}
      </div>
    </div>
  </div>

  <!-- Right: map -->
  <div class="relative flex-none w-[44%]">
    <div bind:this={mapContainer} class="absolute inset-0 w-full h-full"></div>
    <div
      class="absolute inset-y-0 left-0 pointer-events-none z-10 w-[55%] bg-linear-to-r from-(--card) from-30% to-transparent"
    ></div>
    <div
      class="absolute inset-x-0 top-0 h-10 pointer-events-none z-10 bg-linear-to-b from-(--card) to-transparent"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-10 bg-linear-to-t from-(--card) to-transparent"
    ></div>
    <div
      class="absolute inset-y-0 right-0 w-6 pointer-events-none z-10 bg-linear-to-l from-(--card) to-transparent"
    ></div>
    <div
      class="absolute inset-0 pointer-events-none z-5 bg-[radial-gradient(ellipse_60%_50%_at_55%_50%,color-mix(in_oklab,var(--accent)_6%,transparent),transparent_70%)]"
    ></div>
  </div>
</div>

<style>
  :global(.loc-marker) {
    position: relative;
    width: 24px;
    height: 24px;
  }
  :global(.loc-person) {
    position: absolute;
    inset: -6px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transform-origin: bottom center;
    animation: person-pegman 3s infinite ease-in-out;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    color: var(--accent);
    background: var(--card);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    border: 1.5px solid var(--line);
    padding: 4px;
  }
  :global(.loc-ring) {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1.5px solid color-mix(in oklab, #2ed69b 50%, transparent);
    animation: loc-pulse 2.2s ease-out infinite;
    z-index: 1;
  }
  @keyframes -global-person-pegman {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    30% {
      transform: translateY(-8px) rotate(-10deg);
    }
    50% {
      transform: translateY(-12px) rotate(0deg) scaleY(1.05);
    }
    70% {
      transform: translateY(-8px) rotate(10deg);
    }
  }
  @keyframes -global-loc-pulse {
    0% {
      transform: scale(0.6);
      opacity: 1;
    }
    100% {
      transform: scale(2.2);
      opacity: 0;
    }
  }
</style>
