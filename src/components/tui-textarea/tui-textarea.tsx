import { component$, useStore } from '@builder.io/qwik';
import { ImageSrcStore } from '../../components/cards-list/cards-list';
// import '../../index.css';

export function createKudoCard(imgSrc: string): void {
    const ctx = getCanvas();
    const kudo = readkudo();
    imageToCanvas(ctx, imgSrc);
    writeKudoToCanvas(kudo, ctx);
}

export function getCanvas(): CanvasRenderingContext2D {
    const canvas: HTMLCanvasElement = document.getElementById("kudo-canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    // if (ctx) {
    //     // ctx.fillStyle = "green";
    //     // ctx.fillRect(10, 10, 150, 100);
    //     ctx.font = '48px serif';
    //     ctx.fillText('Testing text', 10, 50);
    // }
    return ctx!
}

export function readkudo(): string {
    const text: HTMLTextAreaElement = document.getElementById("kudotext") as HTMLTextAreaElement;
    const kudo: string = text.value;
    // alert(kudo);
    return kudo
}

export function imageToCanvas(ctx: CanvasRenderingContext2D, imgSrc: string): void {
    let bgimage: HTMLImageElement = new Image(660, 460) as HTMLImageElement;
    bgimage.src = imgSrc;
    if (ctx) {
        ctx.drawImage(bgimage, 0, 0);
    }
}

export function canvasToPNG(): void {

}

export function writeKudoToCanvas(multiLineText: string, ctx: CanvasRenderingContext2D): void {
    ctx.font = '24px serif';
    let linenum: number = 150;
    for (const singleline of multiLineText.split('\n')) {
        ctx.fillText(singleline, 10, linenum);
        linenum = linenum + 25;
    }
}

interface KudoCardEditorProps {
    store: ImageSrcStore
}

export const KudoCardEditor = component$((props: KudoCardEditorProps) => {

    // const store = useStore({ imgSrc: props.imageSrc });
    // store.imgSrc = props.imageSrc;

    return (
        <>
            {/* <label htmlFor="comment" className="block text-sm font-medium text-gray-700"> */}
            <label className="block text-sm font-medium text-gray-700">
                Write your Kudo
            </label>
            <div className="relative">
                <div>
                    <canvas id="kudo-canvas2" width="660" height="460" className='absolute inset-0 border-2 border-blue-400'></canvas>
                </div>
                <div className="relative">
                    <img
                        className="object-contain"
                        src={props.store.kudoImageSrc}
                        alt=""
                    />
                    {/* <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" /> */}
                </div>
                <div className="absolute inset-0 bg-transparent mt-2 pt-28 pl-8">
                    <textarea
                        rows={10}
                        cols={46}
                        maxLength={400}
                        name="kudo"
                        id="kudotext"
                        wrap="on"
                        className="text-2xl bg-transparent rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    // defaultValue={''}
                    />
                </div>
            </div>
            <KudoCanvas store={props.store} />
            {/* <div>
                <div className='border-2 border-black'>
                    <canvas id="kudo-canvas" width="660" height="460" className='border-2 border-blue-400'></canvas>
                </div>
                <div className='pt-2'>
                    <button
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick$={() => createKudoCard(props.imageSrc)}>Create Card</button>
                    <button
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 ml-2 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick$={() => createKudoCard(props.imageSrc)}>Share Card</button>
                </div>
            </div> */}
        </>
    );
});


export const KudoCanvas = component$((props: KudoCardEditorProps) => {

    return (
        <div>
            <div className='border-2 border-black'>
                <canvas id="kudo-canvas" width="660" height="460" className='border-2 border-blue-400'></canvas>
            </div>
            <div className='pt-2'>
                <button
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick$={() => createKudoCard(props.store.kudoImageSrc)}>Create Card</button>
                <button
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 ml-2 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick$={() => createKudoCard(props.store.kudoImageSrc)}>Share Card</button>
            </div>
        </div>
    );
});
