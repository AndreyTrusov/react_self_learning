import React, {useEffect, useState} from "react";

export const useStorageState = (
    key: string, 
    initialState : string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
}