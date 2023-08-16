import { Camera } from "./camera";
import { Triangle } from './triangle';

export class Scene{
    private _triangles:Triangle[];
    private _player:Camera;
    constructor(){
        this._triangles = [];
        this._triangles.push(
            new Triangle(
                [0,0,2],
                0
            )
        );
        this._player = new Camera(
            [0, 0.5, -2], 0, 0
        );
    }

    update = () =>{
        this._triangles.forEach(
            (triangle) => triangle.update()
        );

        this._player.update();
    }
    get triangles() : Triangle[]{
        return this._triangles;
    }
    get player():Camera{
        return this._player;
    }
}