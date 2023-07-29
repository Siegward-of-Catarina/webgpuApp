import { Renderer } from "./renderer";
const Initialize = async () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "gfx-main"
  ) as HTMLCanvasElement;

  const renderer: Renderer = new Renderer(canvas);
  renderer.Initialize();
};

Initialize();
