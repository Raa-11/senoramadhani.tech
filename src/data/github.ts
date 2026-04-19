export const skillIconMap: Record<string, string> = {
  'Go':              'go',
  'TypeScript':      'typescript',
  'Python':          'python',
  'Node.js':         'nodedotjs',
  'Rust':            'rust',
  'PostgreSQL':      'postgresql',
  'Redis':           'redis',
  'Elasticsearch':   'elasticsearch',
  'DuckDB':          'duckdb',
  'CSS':             'css',
  'Svelte':          'svelte',
  'Astro':           'astro',
  'React':           'react',
  'shadcn/ui':       'shadcnui',
  'TanStack Start':  'tanstack',
  'Docker':          'docker',
  'Kubernetes':      'kubernetes',
  'k6':              'k6',
  'OpenTelemetry':   'opentelemetry',
  'Red Hat':         'redhat',
  'Fluent Bit':      'fluentbit',
  'Cloudflare':      'cloudflare',
  'Traefik':         'traefikproxy',
  'Pulumi':          'pulumi',
  'Helm':            'helm',
  'New Relic':       'newrelic',
  'Git':             'git',
};

export const skillColoredMap: Record<string, string> = {
  'gRPC':     'https://api.iconify.design/logos:grpc.svg',
  'Vector':   'https://icon.horse/icon/vector.dev',
  'Redpanda': 'https://icon.horse/icon/redpanda.com',
};

export const githubData = {
  username: "Raa-11",
  stats: [
    { label: "Public repos",           value: "24",   num: 24  },
    { label: "Contributions (12mo)",   value: "1,284", num: 1284 },
    { label: "Longest streak",         value: "41 days", num: 41, suffix: " days" },
    { label: "Stars earned",           value: "86",   num: 86  },
  ],
  skills: {
    language: ["Go","TypeScript","Python","Node.js","Rust"],
    backend:  ["gRPC","PostgreSQL","Redis","Elasticsearch","DuckDB"],
    frontend: ["CSS","Svelte","Astro","React","shadcn/ui","TanStack Start"],
    devops:   ["Docker","Kubernetes","OpenTelemetry","Fluent Bit","Vector","Cloudflare","Traefik","Pulumi","Helm","New Relic","Git","Redpanda","k6","Red Hat"],
  },
  contributions: [
    { repo: "grafana/grafana",                type: "pr",    title: "Fix panel editor re-render on datasource swap",    state: "merged", lang: "TypeScript" },
    { repo: "kubernetes/client-go",           type: "pr",    title: "Expose retryAfter header in rate limiter",          state: "merged", lang: "Go" },
    { repo: "open-telemetry/opentelemetry-go",type: "issue", title: "Trace context lost across grpc interceptor chain",  state: "closed", lang: "Go" },
    { repo: "redpanda-data/redpanda",         type: "pr",    title: "Docs: clarify tiered storage retention sem.",       state: "merged", lang: "Markdown" },
    { repo: "golang/go",                      type: "issue", title: "net/http: panic under concurrent Hijack + cancel",  state: "open",   lang: "Go" },
  ] as Array<{ repo: string; type: "pr" | "issue"; title: string; state: "merged" | "open" | "closed"; lang: string }>,
  pinnedRepos: [
    { name: "senoramadhani.tech",    description: "My personal website made with Astro and Svelte. Deployed at Cloudflare Pages.", stars: 2, forks: 0, langs: [{ name: "Astro", color: "#ff5a03" }, { name: "Svelte", color: "#ff3e00" }], topics: ["astro","svelte","portfolio"], url: "https://senoramadhani.tech" },
    { name: "sistem_deteksi_kantuk_iot", description: "Drowsiness detection system based on IoT for vehicles. Uses HOG, EAR & MAR algorithms with Raspberry Pi.", stars: 1, forks: 0, langs: [{ name: "Python", color: "#3572A5" }], topics: ["python","iot","raspberry-pi","computer-vision"], url: null },
    { name: "iso8583",               description: "ISO 8583 financial transaction message library written in Rust. Published on crates.io with 1,500+ downloads.", stars: 1, forks: 0, langs: [{ name: "Rust", color: "#DEA584" }], topics: ["rust","iso8583","payment"], url: "https://crates.io/crates/iso_8583_rs" },
  ],
  heatmap: (() => {
    const out: number[] = [];
    let s = 42;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    for (let w = 0; w < 53; w++) {
      for (let d = 0; d < 7; d++) {
        const recency = w / 53;
        const weekendDamp = (d === 0 || d === 6) ? 0.35 : 1;
        const raw = rnd() * (0.3 + recency * 0.9) * weekendDamp;
        let lvl = 0;
        if (raw > 0.08) lvl = 1;
        if (raw > 0.22) lvl = 2;
        if (raw > 0.40) lvl = 3;
        if (raw > 0.62) lvl = 4;
        out.push(lvl);
      }
    }
    return out;
  })(),
};
