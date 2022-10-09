import { component$ } from '@builder.io/qwik';

export function mypaint(): CanvasRenderingContext2D {
    const canvas: HTMLCanvasElement = document.getElementById("poc-canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    let bgimage: HTMLImageElement = new Image(640, 460) as HTMLImageElement;
    bgimage.src = '/images/big/21.png';
    if (ctx) {
        ctx.drawImage(bgimage, 0, 0);
    }

    // if (ctx) {
    //     // ctx.fillStyle = "green";
    //     // ctx.fillRect(10, 10, 150, 100);
    //     ctx.font = '48px serif';
    //     ctx.fillText('Testing text', 10, 50);
    // }
    return ctx!
}

export const CanvasPoC = component$(() => {

    return (
        <div>
            <div className='border-2 border-black'>
                <canvas id="poc-canvas" width="640" height="460" className='border-2 border-blue-400'></canvas>
            </div>
            <div>
                <button onClick$={() => mypaint()}>Paint Me!</button>
            </div>
        </div>
    );
});