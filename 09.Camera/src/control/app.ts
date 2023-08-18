import { Renderer } from "../view/renderer";
import { Scene } from '../model/scene';
import $ from "jquery"

export class App{
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;
    private scene: Scene;

    private keyLabel: HTMLElement;
    private mouseXLabel: HTMLElement;
    private mouseYLabel: HTMLElement;

    private forwards_amount: number;
    private right_amount: number;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.renderer = new Renderer(this.canvas);
        this.scene = new Scene();

        this.keyLabel = <HTMLElement>document.getElementById("key-label");
        $(document).on("keyup", (event) => {this.handle_keyrelease(event)});
        $(document).on("keydown", (event) => {this.handle_keypress(event)});

        this.mouseXLabel = <HTMLElement>document.getElementById("mouse-x-label");
        this.mouseYLabel = <HTMLElement>document.getElementById("mouse-y-label");
        this.canvas.onclick = () =>{
            this.canvas.requestPointerLock();
        }
        this.canvas.addEventListener(
            "mousemove",
            (event) => {this.handle_mouse_move(event)}
        );

        this.forwards_amount=0;
        this.right_amount=0;
    }

    initialize = async () =>{
        await this.renderer.Initialize();
    }

    run = () =>{

        var running : Boolean = true;

        this.scene.update();
        this.scene.move_player(this.forwards_amount, this.right_amount);
        this.renderer.render(
            this.scene.player,
            this.scene.triangles
        );
        
        if( running ){
            requestAnimationFrame(this.run);
        }
    }

    handle_keypress = (event: JQuery.KeyDownEvent) =>{
        this.keyLabel.innerText = event.code;

        if(event.code == "KeyW"){
            //奥がマイナス
            this.forwards_amount = -0.02;
        }
        if(event.code == "KeyS"){
            this.forwards_amount = 0.02;
        }
        if(event.code == "KeyA"){
            this.right_amount = -0.02;
        }
        if(event.code == "KeyD"){
            this.right_amount = 0.02;
        }
    }

    handle_keyrelease = (event: JQuery.KeyUpEvent) =>{
        this.keyLabel.innerText = event.code;

        if(event.code == "KeyW"){
            this.forwards_amount = 0;
        }
        if(event.code == "KeyS"){
            this.forwards_amount = 0;
        }
        if(event.code == "KeyA"){
            this.right_amount = 0;
        }
        if(event.code == "KeyD"){
            this.right_amount = 0;
        }
    }

    handle_mouse_move = (event: MouseEvent) =>{
        this.mouseXLabel.innerText = event.clientX.toString();
        this.mouseYLabel.innerText = event.clientY.toString();
        this.scene.spin_player(event.movementX / 5, event.movementY/ 10);
    }
}