import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        
        // Cleanup function necessary to avoid memory leak
        return () => { clearTimeout(debounceTimeout) }
    }, [value, delay]);

    return debouncedValue;
}