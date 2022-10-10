import { component$, useStore } from '@builder.io/qwik';
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
interface thumbnail {
    id: number,
    name: string,
    href: string,
    imageSrc: string,
    bigImageSrc: string,
    imageAlt: string,
    type: string,
}

export const classic: thumbnail[] = [
    {
        id: 1,
        name: 'Great Job',
        href: '#',
        imageSrc: '/images/small/1.jpg',
        bigImageSrc: '/images/big/1.png',
        imageAlt: "Great Job - Classic",
        type: 'classic',
    },
    {
        id: 2,
        name: 'Totally Awesome',
        href: '#',
        imageSrc: '/images/small/3.jpg',
        bigImageSrc: '/images/big/3.png',
        imageAlt: "Totally Awesome - Classic",
        type: 'classic',
    },
    {
        id: 3,
        name: 'Thank You',
        href: '#',
        imageSrc: '/images/small/4.jpeg',
        bigImageSrc: '/images/big/4.png',
        imageAlt: "Thank You - Classic",
        type: 'classic',
    },
    {
        id: 4,
        name: 'Congratulations',
        href: '#',
        imageSrc: '/images/small/6.jpg',
        bigImageSrc: '/images/big/6.png',
        imageAlt: "Congratulations - Classic",
        type: 'classic',
    },
    {
        id: 5,
        name: 'Well Done',
        href: '#',
        imageSrc: '/images/small/7.jpg',
        bigImageSrc: '/images/big/7.png',
        imageAlt: "Well Done - Classic",
        type: 'classic',
    },
]
export const fancy: thumbnail[] = [
    {
        id: 11,
        name: 'Great Job',
        href: '#',
        imageSrc: '/images/small/21.jpeg',
        bigImageSrc: '/images/big/21.png',
        imageAlt: "Great Job - Fancy",
        type: 'fancy',
    },
    {
        id: 12,
        name: 'Totally Awesome',
        href: '#',
        imageSrc: '/images/small/23.jpg',
        bigImageSrc: '/images/big/23.png',
        imageAlt: "Totally Awesome - Fancy",
        type: 'fancy',
    },
    {
        id: 13,
        name: 'Thank You',
        href: '#',
        imageSrc: '/images/small/24.jpg',
        bigImageSrc: '/images/big/24.png',
        imageAlt: "Thank You - Fancy",
        type: 'fancy',
    },
    {
        id: 14,
        name: 'Congratulations',
        href: '#',
        imageSrc: '/images/small/26.jpg',
        bigImageSrc: '/images/big/26.png',
        imageAlt: "Congratulations - Fancy",
        type: 'fancy',
    },
    {
        id: 15,
        name: 'Well Done',
        href: '#',
        imageSrc: '/images/small/27.jpg',
        bigImageSrc: '/images/big/27.png',
        imageAlt: "Well Done - Fancy",
        type: 'fancy',
    },
]
export const simple: thumbnail[] = [
    {
        id: 11,
        name: 'Great Job',
        href: '#',
        imageSrc: '/images/small/11.jpg',
        bigImageSrc: '/images/big/11.png',
        imageAlt: "Great Job - Simple",
        type: 'simple',
    },
    {
        id: 12,
        name: 'Totally Awesome',
        href: '#',
        imageSrc: '/images/small/13.jpg',
        bigImageSrc: '/images/big/13.png',
        imageAlt: "Totally Awesome - Simple",
        type: 'simple',
    },
    {
        id: 13,
        name: 'Thank You',
        href: '#',
        imageSrc: '/images/small/14.jpg',
        bigImageSrc: '/images/big/14.png',
        imageAlt: "Thank You - Simple",
        type: 'simple',
    },
    {
        id: 14,
        name: 'Congratulations',
        href: '#',
        imageSrc: '/images/small/16.jpg',
        bigImageSrc: '/images/big/16.png',
        imageAlt: "Congratulations - Simple",
        type: 'simple',
    },
    {
        id: 15,
        name: 'Well Done',
        href: '#',
        imageSrc: '/images/small/17.jpg',
        bigImageSrc: '/images/big/17.png',
        imageAlt: "Well Done - Simple",
        type: 'simple',
    },
]

interface tab {
    name: string,
    href: string,
    current: boolean,
    thumbnails: thumbnail[],
}

interface CardsMenuListProps {
    tabs: tab[]
}

interface CardThumbnailsProps {
    tabs: tab[],
    store: ImageSrcStore
}

export const kudotabs: tab[] = [
    { name: 'Classic', href: '#', current: false, thumbnails: classic },
    { name: 'Fancy', href: '#', current: true, thumbnails: fancy },
    { name: 'Simple', href: '#', current: false, thumbnails: simple },
]

export function classNames({ classes = [] }: { classes?: any[]; } = {}) {
    return classes.filter(Boolean).join(' ')
}

// TODO: Use Generics
export function swtichtabs(tabs: tab[], selected: number) {
    tabs.map((tab, index) => {
        (index === selected)
            ? tab.current = true
            : tab.current = false
    })
}

export interface ImageSrcStore {
    kudoImageSrc: string,
    // getKudoImageSrc$: PropFunction<() => string>;
}

interface CardsMenuProps {
    store: ImageSrcStore
}

export const CardsMenu = component$((props: CardsMenuProps) => {

    // Qwik specific Hooks API for recursive
    const tabsStore = useStore({ tabs: kudotabs }, { recursive: true });

    return (
        <>
            <div>
                <CardsMenuList tabs={tabsStore.tabs} />
            </div>
            <div>
                <CardThumbnails tabs={tabsStore.tabs} store={props.store} />
            </div>
        </>
    );
}
);

export const CardThumbnails = component$((props: CardThumbnailsProps) => {

    const thumbnails = props.tabs.filter((tab) => (tab.current)).flatMap(t => t.thumbnails);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-2 px-4 sm:py-24 sm:px-6 lg:py-6 lg:max-w-7xl lg:px-8">
                {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Kudo Cards</h2> */}

                <div className="mt-1 grid grid-cols-3 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {thumbnails.map((thumbnail) => (
                        <div key={thumbnail.id} className="group relative">
                            <div className="aspect-none w-3/4 overflow-hidden rounded-sm bg-gray-400 group-hover:opacity-75   lg:aspect-none" onClick$={() => {
                                props.store.kudoImageSrc = thumbnail.bigImageSrc;
                            }}>
                                <img
                                    src={thumbnail.imageSrc}
                                    alt={thumbnail.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                // onClick$={() => (props.store.kudoImageSrc = thumbnail.bigImageSrc)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* <canvas id="poc-canvas2" width="640" height="360" /> */}
            </div>
        </div>
    )
});

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export const CardsMenuList = component$((props: CardsMenuListProps) => {

    // const store = useStore<CountStore>({ count: 0 });

    return (
        <div className="border-b border-gray-200 pb-5 sm:pb-0">
            {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Kudo Cards</h3> */}
            <div className="mt-3 sm:mt-4">
                <div className="sm:hidden">
                    {/* <label htmlFor="current-tab" className="sr-only"> */}
                    <label className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    //defaultValue={tabs.find((tab) => tab.current).name}
                    >
                        {props.tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                        {props.tabs.map((tab, index) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    {
                                        classes: [tab.current
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                            'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm']
                                    })}
                                aria-current={tab.current ? 'page' : undefined}
                                onClick$={() => swtichtabs(props.tabs, index)}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
});
