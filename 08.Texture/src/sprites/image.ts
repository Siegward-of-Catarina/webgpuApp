export class ImageData
{
    private _data: ImageBitmap | null;

    constructor()
    {
        this._data = null;
    }

    async loadImage(url: string)
    {
        const response: Response = await fetch(url);
        //for binary
        const blob: Blob = await response.blob();
        this._data = await createImageBitmap(blob);
    }

    get data(): ImageBitmap
    {
        return this._data!;
    }
}