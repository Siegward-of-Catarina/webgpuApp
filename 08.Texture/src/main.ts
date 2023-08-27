import { Renderer } from "./renderer";
async function Initialize()
{
  const canvas: HTMLCanvasElement = await document.getElementById(
    "gfx-main"
  ) as HTMLCanvasElement;

  const renderer: Renderer = new Renderer(canvas);
  await renderer.Initialize();
};

Initialize();
