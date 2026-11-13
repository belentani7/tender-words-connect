import indexHtml from "../../index.html?raw";
import vercelJson from "../../vercel.json?raw";

describe("production entrypoint", () => {
  it("mounts the real React application from the Vite shell", () => {
    expect(indexHtml).toContain('<div id="root"></div>');
    expect(indexHtml).toContain('<script type="module" src="/src/main.tsx"></script>');
    expect(indexHtml).not.toContain("document.createElement('canvas')");
    expect(indexHtml).not.toContain("document.createElement(");
  });

  it("keeps Vercel aligned with the Vite output and SPA routes", () => {
    const config = JSON.parse(vercelJson);

    expect(config.framework).toBe("vite");
    expect(config.outputDirectory).toBe("dist");
    expect(config.builds).toBeUndefined();
    expect(config.rewrites).toEqual([
      { source: "/enciclopedia", destination: "/index.html" },
      { source: "/enciclopedia/:path*", destination: "/index.html" },
    ]);
  });
});
