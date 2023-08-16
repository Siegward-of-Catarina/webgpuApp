import { App } from "./control/app";
import { Renderer } from "./view/renderer";
const Initialize = async () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "gfx-main"
  ) as HTMLCanvasElement;

  const app = new App( canvas );
  await app.initialize();
  app.run();
};

Initialize();
