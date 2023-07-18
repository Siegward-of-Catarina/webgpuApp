import shader from "./shader.wgsl"

const checkingGPU = () =>{
    if(!navigator.gpu){
        alert("お使いのブラウザはWebGPUに対応していません。");
    }
}

const Initialize =async () => {
    checkingGPU();
    const canvas : HTMLCanvasElement = document.getElementById("gfx-main") as HTMLCanvasElement;
    const adapter: GPUAdapter = await navigator.gpu.requestAdapter() as GPUAdapter;
    const device : GPUDevice = await adapter.requestDevice() as GPUDevice;
    const context : GPUCanvasContext= canvas.getContext("webgpu") as GPUCanvasContext;
    const format: GPUTextureFormat = "bgra8unorm";
    context.configure({
        device:device,
        format:format
    });

    const module:GPUShaderModule = device.createShaderModule({code:shader}) as GPUShaderModule;
    const pipeline = device.createRenderPipeline({
        vertex:{
            module: module,
            entryPoint: "vs_main"
        },
        
        fragment:{
            module:module,
            entryPoint:"fs_main",
            targets:[{format:format}]
        },

        primitive:{
            topology: "triangle-list"
        }
    });
}