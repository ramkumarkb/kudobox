import { component$, useStore } from '@builder.io/qwik';
import { KudoCardEditor } from '../../components/tui-textarea/tui-textarea';
import { CardsMenu, ImageSrcStore } from '../../components/cards-list/cards-list';

// import { CanvasPoC } from '../../components/canvas-poc/canvas-poc';

export default component$(() => {
    // const test$ = $(async () => '/images/big/21.png');

    const store = useStore<ImageSrcStore>({ kudoImageSrc: '/images/big/21.png' });

    return (
        <>
            <h2>Kudobox built with Qwik and TailwindUI components</h2>
            <CardsMenu store={store} />
            {/* <KudoCardEditor imageSrc={store.kudoImageSrc} /> */}
            <KudoCardEditor store={store} />
            {/* <CanvasPoC /> */}
        </>
    );
});