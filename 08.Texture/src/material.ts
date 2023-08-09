import { sources } from "webpack";

export class Material{
    texture:GPUTexture|null;
    view:GPUTextureView|null;
    sampler:GPUSampler|null;
    constructor(){
        this.texture = null;
        this.view = null;
        this.sampler = null;
    }

    initialize = async (device:GPUDevice, url:string) => {

        const response: Response = await fetch(url);
        //for binary
        const blob: Blob = await response.blob();
        const imageData : ImageBitmap = await createImageBitmap(blob); 

        await this.loadImageBitmap(device, imageData);
    }

    loadImageBitmap = async (device:GPUDevice, imageData:ImageBitmap) =>{
        const textureDescriptor:GPUTextureDescriptor ={
            size:{
                width: imageData.width,
                height: imageData.height
            },
            format: "bgra8unorm",
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
        }

        this.texture = device.createTexture(textureDescriptor);

        device.queue.copyExternalImageToTexture(
            {source:imageData},
            {texture:this.texture},
            textureDescriptor.size
        );
    }
}