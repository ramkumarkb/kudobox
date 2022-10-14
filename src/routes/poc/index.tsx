import { component$, useStore } from '@builder.io/qwik';
import { StorePoC, } from '../../components/qwik-playground/store-poc';
import { SignalPoC, } from '../../components/qwik-playground/signal-poc';

export default component$(() => {

    return (
        <>
            <StorePoC />
            <br />
            <hr />
            <SignalPoC />
        </>
    );

});
