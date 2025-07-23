'use client';

import React, {useEffect, useState} from "react";
import {stories, Story} from "./storiesData";
import {useStorageState} from "@/app/useStorageState";

// const tryingFun = list.map(function (item) {
//     return item.title + "\n" + item.num_comments + "\n";
// })

type SearchProps = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type ListType = {
    list: Story[];
}

export default function Home() {
    const [number, setNumber] = useState(0);
    const handleClick = () => {
        setNumber(number + 1);
    }

    const initialState = localStorage.getItem('search') || '';
    const [searchTerm, setSearchTerm] = useStorageState('search', initialState);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


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

                <InputWithLabel id="search" label="Search Stories:" value={searchTerm} onInputChange={handleSearch}/>

                <List list={searchedStories}/>

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
                        }: SearchProps) => (
    <div className="mb-8">
        <label htmlFor={id} className="block text-[rgb(75,30,47)] font-medium mb-2">{label}</label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
            className="w-full p-3 border-2 border-[rgb(212,160,23)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(192,57,43)] focus:border-transparent"
            placeholder="Type to search..."
        />
    </div>
);
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

const List = ({list}: ListType) => (
    <ul className="space-y-4">
        {list.map((item) => (
            <Item key={item.objectID} {...item} />
        ))}
    </ul>
);


const Item = ({title, url, author, num_comments, points, objectID}: Story) => (
    <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[rgb(240,230,140)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2  md:mb-0">
                <a
                    href={url}
                    className="text-lg font-semibold text-[rgb(44,62,80)] hover:text-[rgb(192,57,43)] transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {title}
                </a>
                <p className="text-sm text-gray-600">by {author}</p>
            </div>
            <div className="flex items-center space-x-2">
                <span
                    className="bg-[rgb(240,230,140)] text-[rgb(75,30,47)] px-2 py-1 rounded text-xs font-medium w-30 text-center">
                    Comments: {num_comments}
                </span>
                <span
                    className="bg-[rgb(212,160,23)] text-white px-2 py-1 rounded text-xs font-medium w-20 text-center">
                    Points: {points}
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium w-15 text-center">
                    ID: {objectID}
                </span>
            </div>
        </div>
    </li>
);
