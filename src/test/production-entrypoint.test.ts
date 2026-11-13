import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("production entrypoint", () => {
  it("mounts the real React application from the Vite shell", () => {
    const html = read("index.html");

    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('<script type="module" src="/src/main.tsx"></script>');
    expect(html).not.toContain("document.createElement('canvas')");
    expect(html).not.toContain("document.createElement(");
  });

  it("keeps Vercel aligned with the Vite output and SPA routes", () => {
    const config = JSON.parse(read("vercel.json"));

    expect(config.framework).toBe("vite");
    expect(config.outputDirectory).toBe("dist");
    expect(config.builds).toBeUndefined();
    expect(config.rewrites).toEqual([
      { source: "/enciclopedia", destination: "/index.html" },
      { source: "/enciclopedia/:path*", destination: "/index.html" },
    ]);
  });
});
