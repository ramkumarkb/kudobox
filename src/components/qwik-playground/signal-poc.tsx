import { component$, useSignal, Signal } from '@builder.io/qwik';

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

export const SignalPoC = component$(() => {

    const newrack = useSignal<Lib>({ rack: comics, count: 0 });
    const test = useSignal(0);

    return (
        <>
            <button onClick$={() => swapComix(newrack.value.rack)}>Swap from Parent</button>
            <br />
            <button onClick$={() => newrack.value.count++}>Increment from Parent</button>
            <br />
            <button onClick$={() => test.value++}>Increment Test Parent</button>
            <ChildSignal library={newrack} />
            <br />
            <Child2Signal test={test} />
        </>
    );
});

interface ChildProps {
    library: Signal<Lib>;
}

export const ChildSignal = component$<ChildProps>(({ library }) => {
    return <div>

        Counter: {library.value.count} <br /> <br />
        <button onClick$={() => library.value.count++}>Increment from Child</button>
        <br />
        <button onClick$={() => swapComix(library.value.rack)}>Swap from Child</button>
        <br />
        Comic: {selectedComic(library.value.rack)}
    </div>
});

interface Child2Props {
    test: Signal<number>;
}

export const Child2Signal = component$<Child2Props>(({ test }) => {
    return <div>
        Test Counter: {test.value} <br />
        <br />
        <button onClick$={() => test.value++}>Increment Test from Child</button>
        <br />
    </div>
});