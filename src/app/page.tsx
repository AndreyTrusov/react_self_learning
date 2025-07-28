'use client';

import React, {ChangeEvent, ReactNode, useEffect, useReducer, useRef, useState} from "react";
import {initialStories, Story} from "./storiesData";
import {useStorageState} from "@/app/useStorageState";

// const tryingFun = list.map(function (item) {
//     return item.title + "\n" + item.num_comments + "\n";
// })

type SearchProps = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
    isFocused?: boolean;
};

type ListType = {
    list: Story[];
    onRemoveItem: (id: Story) => void;
}

type StoriesAction =
    | { type: 'SET_STORIES'; payload: Story[] }
    | { type: 'REMOVE_STORY'; payload: Story }
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_FAILURE' };


type StoriesState = {
    data: Story[];
    isLoading: boolean;
    isError: boolean;
};

const getAsyncStories = (): Promise<{ data: { stories: Story[] } }> =>
    // new Promise((resolve, reject) =>
    //     setTimeout(reject,
    //         2000
    //     )
    // );
    new Promise((resolve) =>
        setTimeout(() => resolve({data: {stories: initialStories}}),
            2000
        )
    );

const storiesReducer = (state: StoriesState, action: StoriesAction): StoriesState => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true };
        case 'SET_STORIES':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(story => story.objectID !== action.payload.objectID),
            };
        default:
            throw new Error();
    }
};

export default function Home() {
    const [number, setNumber] = useState(0);
    const handleClick = () => {
        setNumber(number + 1);
    }

    const initialState = localStorage.getItem('search') || '';
    const [searchTerm, setSearchTerm] = useStorageState('search', initialState);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    // Asynchronous Data
    // const [stories, setStories] = useState(initialStories);

    // const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // setIsLoading(true);
        dispatchStories({type: 'FETCH_INIT'});

        getAsyncStories()
            .then(result => {
            // setStories(result.data.stories);
            dispatchStories({
                type: 'SET_STORIES',
                payload: result.data.stories,
            });
            setIsLoading(false);
        })
            .catch(() => dispatchStories({type: 'FETCH_FAILURE'}));
    }, []);


    // Advanced State

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false},
    );

    const searchedStories = stories.data.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveStory = (item: Story) => {
        // const newStories = stories.filter(
        //     (story) => item.objectID !== story.objectID
        // );

        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });

        // setStories(newStories);
        setSearchTerm('');
    }

    return (
        <div className="min-h-screen bg-[rgb(240,230,140)] p-8">
            <div className="max-w-4xl mx-auto bg-[rgb(255,255,255,0.9)] rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-bold text-[rgb(75,30,47)] mb-6 text-center">Tech Stories</h1>

                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={handleClick}
                        className="bg-[rgb(192,57,43)] hover:bg-[rgb(212,160,23)] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow"
                    >
                        Test you mouse
                    </button>
                    <div className="bg-[rgb(212,160,23)] text-[rgb(75,30,47)] py-2 rounded-lg shadow w-40 text-center">
                        <h2 className="text-2xl font-semibold">Counter: {number}</h2>
                    </div>
                </div>

                <InputWithLabel id="search" label="Search Stories:" value={searchTerm} onInputChange={handleSearch}
                                isFocused>
                    <strong>Search:</strong>
                </InputWithLabel>

                {stories.isError &&
                    <p className="text-center text-gray-700 text-lg mb-6">Something went wrong ...</p>}

                {stories.isLoading ? (
                    <p className="text-center text-gray-700 text-lg mb-6">Loading...</p>
                ) : (
                    <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
                )}

                <hr className="my-6 border-[rgb(47,79,79)] opacity-30"/>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        alert('Submitting!');
                    }}
                    className="mt-6"
                >
                    <button
                        type="submit"
                        className="w-full bg-[rgb(44,62,80)] hover:bg-[rgb(47,79,79)] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow"
                    >
                        Submit Form
                    </button>
                </form>
            </div>
        </div>
    );
}

const InputWithLabel = ({
                            id,
                            label,
                            value,
                            onInputChange,
                            type = 'text',
                            children,
                            isFocused,
                        }: SearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // When this effect runs, go find the input element and focus it.
    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isFocused]);

    return (<>
        <div className="mb-8">
            <label htmlFor={id}
                   className="block text-[rgb(75,30,47)] font-medium mb-2">{children}</label>
            <input
                id={id}
                type={type}
                ref={inputRef}
                value={value}
                onChange={onInputChange}
                autoFocus={isFocused}
                className="w-full p-3 border-2 border-[rgb(212,160,23)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(192,57,43)] focus:border-transparent"
                placeholder="Type to search..."
            />
        </div>
    </>);

};
// const Search = (props) => {
//     const {value, whenChanges} = props;
//
//     return (
//         <div>
//             <label htmlFor="search">Search: </label>
//             <input id="search" type="text" value={value} onChange={whenChanges}/>
//         </div>
//     );
// };

const List = ({list, onRemoveItem}: ListType) => (
    <ul className="space-y-4">
        {list.map((item) => (
            // <Item key={item.objectID} onRemoveItem={onRemoveItem} {...item}/>
            <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item}/>
        ))}
    </ul>
);


const Item = ({item, onRemoveItem}: { item: Story; onRemoveItem: (item: Story) => void }) => {
    const handleRemoveItem = () => {
        onRemoveItem(item);
    };

    // const { title, url, author, num_comments, points, objectID } = item;

    return (
        <>
            <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[rgb(240,230,140)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-2  md:mb-0">
                        <a
                            href={item.url}
                            className="text-lg font-semibold text-[rgb(44,62,80)] hover:text-[rgb(192,57,43)] transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.title}
                        </a>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                <span
                    className="bg-[rgb(240,230,140)] text-[rgb(75,30,47)] px-2 py-1 rounded text-xs font-medium w-30 text-center">
                    Comments: {item.num_comments}
                </span>
                        <span
                            className="bg-[rgb(212,160,23)] text-white px-2 py-1 rounded text-xs font-medium w-20 text-center">
                    Points: {item.points}
                </span>
                        <span
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium w-15 text-center">
                    ID: {item.objectID}
                </span>
                        <button
                            type="button"
                            onClick={handleRemoveItem}
                            className="bg-red-700 hover:bg-red-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </li>
        </>
    )
};
