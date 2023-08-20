import { Shader } from "../../base/shader_base";
import shader from "../shaderSource/textureShaders.wgsl";

export class TextureShader extends Shader {
  constructor(device: GPUDevice) {
    super();

    this._module = device.createShaderModule({
      code: shader,
    });

    this._bufferLayout = {
      arrayStride: 20,
      attributes: [
        {
          shaderLocation: 0,
          format: "float32x3",
          offset: 0,
        },
        {
          shaderLocation: 1,
          format: "float32x2",
          offset: 12,
        },
      ],
    };
  }
}
