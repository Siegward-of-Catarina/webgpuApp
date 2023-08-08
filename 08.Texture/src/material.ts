export class Material{
    texture:GPUTexture|null;
    view:GPUTextureView|null;
    sampler:GPUSampler|null;
    constructor(){
        this.texture = null;
        this.view = null;
        this.sampler = null;
    }

    async initialize(device:GPUDevice, url:string){

        const response: Response = await fetch(url);
        //for binary
        const blob: Blob = await response.blob();
        const imageData : ImageBitmap = await createImageBitmap(blob); 
    }
}