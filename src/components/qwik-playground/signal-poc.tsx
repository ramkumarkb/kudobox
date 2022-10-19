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

export function swapComix(lib: Lib): Lib {
    console.log("selectComix is called!");
    let next = 0;
    for (let i = 0; i < lib.rack.length; i++) {
        if (lib.rack[i].selected) {
            (i === (lib.rack.length - 1)) ? next = 0 : next = i + 1;
            lib.rack[i].selected = false
            lib.rack[next].selected = true;
            break;
        }
    }
    console.log('comic name ' + comics[next].name);
    return { rack: lib.rack, count: lib.count }
    // comics.map((comic, index) => {
    //     (index === 2) ? nextSelected = 0 : nextSelected = index+1;
    //     (comic.selected)
    //         ? comic.selected = false
    //         : comics[nextSelected].selected = true
    // })
}

export function incrementCount(lib: Lib): Lib {

    return { rack: lib.rack, count: ++lib.count }

}

export const SignalPoC = component$(() => {

    const newrack = useSignal<Lib>({ rack: comics, count: 0 });
    const test = useSignal(0);

    return (
        <>
            <button onClick$={() => { newrack.value = swapComix(newrack.value) }}>Swap from Parent</button>
            <br />
            <button onClick$={() => { newrack.value = incrementCount(newrack.value) }}>Increment from Parent</button>
            <br />
            <button onClick$={() => test.value++}>Increment Value Parent</button>
            <hr /> <br /> <hr />
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


        <button onClick$={() => { library.value = incrementCount(library.value) }}>Increment from Child</button>
        <br />
        <button onClick$={() => { library.value = swapComix(library.value) }}>Swap from Child</button>
        <br />
        Comic: {selectedComic(library.value.rack)}
        <br />
        Counter: {library.value.count} <br />
    </div>
});

interface Child2Props {
    test: Signal<number>;
}

export const Child2Signal = component$<Child2Props>(({ test }) => {
    return <div>
        Test Counter: {test.value} <br />
        <br />
        <button onClick$={() => test.value++}>Increment Value from Child</button>
        <br />
    </div>
});