import { vec3 } from "gl-matrix";
import { Camera } from "./camera";
import { Triangle } from './triangle';

export class Scene{
    private _triangles:Triangle[];
    private _player:Camera;
    constructor(){
        this._triangles = [];
        this._triangles.push(
            new Triangle(
                [0,0,-2],
                0
            )
        );
        this._player = new Camera(
            [0, 0.5, 0], 0, 0
        );
    }

    update = () =>{
        this._triangles.forEach(
            (triangle) => triangle.update()
        );

        this._player.update();
    }

    spin_player = (dx: number, dy: number) =>{
        var eulers:vec3 = this._player.eulers;
        eulers[1] -= dx;
        eulers[1] %= 360;
        eulers[2] = Math.min(
            89, //rimit
            Math.max(-89, eulers[2] +dy)
        );

        this._player.eulers = eulers;
    }

    move_player(forwards_amount:number, right_amount:number ){
        var pos = this._player.position;
        vec3.scaleAndAdd( pos, pos, this._player.forwards, forwards_amount);
        vec3.scaleAndAdd( pos, pos, this._player.right, right_amount);
        this._player.position = pos;
        console.log("pos;" + pos);
    }
    get triangles() : Triangle[]{
        return this._triangles;
    }
    get player():Camera{
        return this._player;
    }
}