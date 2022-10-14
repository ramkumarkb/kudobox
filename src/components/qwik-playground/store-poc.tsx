import { component$, useStore } from '@builder.io/qwik';

export interface Comix {
    name: string,
    selected: boolean
}

export const comics: Comix[] = [
    { name: 'asterix', selected: true },
    { name: 'obelix', selected: false },
    { name: 'impedimenta', selected: false },
]

export interface Lib {
    rack: Comix[]
    count: number
}

export const StorePoC = component$(() => {

    const myrack = useStore<Lib>({ rack: comics, count: 0 }, { recursive: true });

    return (
        <>
            <button onClick$={() => swapComix(myrack.rack)}>Swap from Parent</button>
            <br />
            <button onClick$={() => myrack.count++}>Increment from Parent</button>
            <ChildStore library={myrack} />
        </>
    );
});

interface ChildProps {
    library: Lib
}

export function selectedComic(comics: Comix[]): string {
    return comics.filter((comic) => (comic.selected)).flatMap(c => c.name)[0]
}

export function swapComix(comics: Comix[]): void {
    console.log("selectComix is called!");
    let next = 0;
    for (let i = 0; i < comics.length; i++) {
        if (comics[i].selected) {
            (i === (comics.length - 1)) ? next = 0 : next = i + 1;
            comics[i].selected = false
            comics[next].selected = true;
            break;
        }
    }
    console.log('comic name ' + comics[next].name);
    // comics.map((comic, index) => {
    //     (index === 2) ? nextSelected = 0 : nextSelected = index+1;
    //     (comic.selected)
    //         ? comic.selected = false
    //         : comics[nextSelected].selected = true
    // })
}

export const ChildStore = component$<ChildProps>(({ library }) => {
    return <div>

        Counter: {library.count} <br /> <br />
        <button onClick$={() => library.count++}>Increment from Child</button>
        <br />
        <button onClick$={() => swapComix(library.rack)}>Swap from Child</button>
        <br />
        Comic: {selectedComic(library.rack)}
    </div>
});