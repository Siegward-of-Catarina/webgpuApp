import { mat4, vec3 } from "gl-matrix";
import { Camera } from "./camera";
import { Triangle } from './triangle';

export class Scene
{
    private _triangles: Triangle[];
    private _player: Camera;
    private _object_data: Float32Array;
    private _triangle_count: number;
    constructor()
    {
        this._triangles = [];
        this._object_data = new Float32Array(16 * 1024); // mat4x4 x 1024個
        this._triangle_count = 0;
        var i: number = 0;//all object count
        for (var x: number = -3; x < 3; x++)
        {
            this._triangles.push(
                new Triangle(
                    [x, 0, -2],
                    0
                )
            );

            var black_matrix = mat4.create();
            const size = 16;
            for (var j: number = 0; j < size; j++)
            {
                this._object_data[size * i + j] = <number>black_matrix.at(j);
            }
            this._triangle_count++;
            i++;
        }

        this._player = new Camera(
            [0, 0.5, 0], 0, 0
        );
    }

    update()
    {
        var i: number = 0;
        this._triangles.forEach(
            (triangle) => 
            {
                triangle.update();
                const size = 16;
                var model = triangle.model;
                for (var j: number = 0; j < size; j++)
                {
                    this._object_data[size * i + j] = <number>model.at(j);
                }
                i++;
            }
        );

        this._player.update();
    }

    spin_player(dx: number, dy: number)
    {
        var eulers: vec3 = this._player.eulers;
        eulers[1] -= dx;
        eulers[1] %= 360;
        eulers[2] = Math.min(
            89, //rimit
            Math.max(-89, eulers[2] + dy)
        );

        this._player.eulers = eulers;
    }

    move_player(forwards_amount: number, right_amount: number)
    {
        var pos = this._player.position;
        vec3.scaleAndAdd(pos, pos, this._player.forwards, forwards_amount);
        vec3.scaleAndAdd(pos, pos, this._player.right, right_amount);
        this._player.position = pos;
        //console.log("pos;" + pos);
    }
    get triangles(): Float32Array
    {
        return this._object_data;
    }
    get player(): Camera
    {
        return this._player;
    }
    get triangle_count(): number
    {
        return this._triangle_count;
    }
}