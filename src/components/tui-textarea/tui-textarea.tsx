import { component$, Signal, useSignal, useStore } from '@builder.io/qwik';
import { ImageSrcStore, classNames } from '../../components/cards-list/cards-list';
// import '../../index.css';

export function createKudoCard(imgSrc: string, selectedFont: string): void {
    const ctx = getCanvas();
    const kudo = readkudo();
    imageToCanvas(ctx, imgSrc);
    writeKudoToCanvas(ctx, kudo, selectedFont);
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

export function writeKudoToCanvas(ctx: CanvasRenderingContext2D, multiLineText: string, selectedFont: string): void {
    ctx.font = '26px ' + selectedFont;
    let linenum: number = 150;
    for (const singleline of multiLineText.split('\n')) {
        ctx.fillText(singleline, 10, linenum);
        linenum = linenum + 25;
    }
}

interface KudoCardEditorProps {
    store: ImageSrcStore
}

// get the selected tailwind fontname, as it has the font-<name> format
export function getTwFontname(fonts: font[]): string {
    return fonts.filter((font) => (font.current)).flatMap(t => t.twname)[0];
}

// get the selected fontname
export function getFontname(fonts: font[]): string {
    return fonts.filter((font) => (font.current)).flatMap(t => t.name)[0];
}

export const KudoCardEditor = component$((props: KudoCardEditorProps) => {

    // const selectedFont = useSignal(fonttabs);
    const selectedFont = useStore<FontSrcStore>({ fonts: fonttabs }, { recursive: true });

    return (
        <>
            {/* <label htmlFor="comment" className="block text-sm font-medium text-gray-700"> */}
            <FontMenuList fonts={selectedFont.fonts} />
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
                        className={"text-2xl bg-transparent rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + getTwFontname(selectedFont.fonts)}
                    // defaultValue={''}
                    />
                </div>
            </div>
            <KudoCanvas imgstore={props.store} fontstore={selectedFont} />
        </>
    );
});

export interface FontSrcStore {
    fonts: font[],
    // getKudoImageSrc$: PropFunction<() => string>;
}
interface KudoCanvasProps {
    imgstore: ImageSrcStore,
    fontstore: FontSrcStore
}

export const KudoCanvas = component$((props: KudoCanvasProps) => {

    return (
        <div>
            <div className='border-2 border-black'>
                <canvas id="kudo-canvas" width="660" height="460" className='border-2 border-blue-400'></canvas>
            </div>
            <div className='pt-2'>
                <button
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick$={() => createKudoCard(props.imgstore.kudoImageSrc, getFontname(props.fontstore.fonts))}>Create Card</button>
                <button
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 ml-2 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick$={() => createKudoCard(props.imgstore.kudoImageSrc, getFontname(props.fontstore.fonts))}>Share Card</button>
            </div>
        </div>
    );
});

interface font {
    twname: string,
    name: string,
    href: string,
    current: boolean
}

export const fonttabs: font[] = [
    { twname: 'font-festus', name: 'festus', href: '#', current: true },
    { twname: 'font-handyboldcyr', name: 'handyboldcyr', href: '#', current: false },
    { twname: 'font-marckscript', name: 'marckscript', href: '#', current: false },
]

interface FontMenuListProps2 {
    fonts: Signal<font[]>
}
interface FontMenuListProps {
    fonts: font[]
}

export function swtichfonts(fonts: font[], selected: number) {
    fonts.map((font, index) => {
        (index === selected)
            ? font.current = true
            : font.current = false
    })
}

export const FontMenuList = component$<FontMenuListProps>(({ fonts }) => {

    return (
        <div className="border-b border-gray-200 pb-5 sm:pb-0">
            {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Kudo Cards</h3> */}
            <div className="mt-3 sm:mt-4">
                <div className="sm:hidden">
                    {/* <label htmlFor="current-tab" className="sr-only"> */}
                    <label className="sr-only">
                        Select a Font
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    //defaultValue={tabs.find((tab) => tab.current).name}
                    >
                        {fonts.map((font) => (
                            <option key={font.name} className={font.twname}>Your Message</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                        {fonts.map((font, index) => (
                            <a
                                key={font.name}
                                // href={font.href}
                                className={classNames(
                                    {
                                        classes: [font.current
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                            'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-xl', font.twname
                                        ]
                                    })}
                                aria-current={font.current ? 'page' : undefined}
                                onClick$={() => swtichfonts(fonts, index)}
                            >
                                Your Message
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
});