import { Object_base } from "../base/object_base";

export class Objects
{
    private _objects: Object_base[];
    private _object_data: Float32Array;
    constructor()
    {
        this._objects = [];
        this._object_data = new Float32Array(16 * 1024);
    }
}