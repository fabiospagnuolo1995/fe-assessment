import { useEffect, useState, useMemo, useRef } from "react";
import { getUniversity } from "@api/get-university";
import { useDebounce } from "@customHooks/useDebounce";
import { University } from "@customTypes/index";
import { ArrowDown, ArrowUp } from "@components/icon-component";
import './index.css';

type LazySelectType = {
    label: string;
    disabled: boolean;
    onObjectSelected: (value: string) => void;
};

//To make this component reusable is necessary another prop 
const SelectUniversity = (props: LazySelectType) => {
    const { label, disabled, onObjectSelected } = props;
    const [loading, setLoading] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [universities, setUniversities] = useState<University[]>([]);
    const [errorStatus, setErrorStatus] = useState(false);
    const debouncedValue = useDebounce(filterValue);
    //Computed property
    const hiddenBox = useMemo(() => {
        return Boolean(universities.length === 0 && !loading)
    }, [universities, loading]);
    // Input search ref: uncontrolled approach
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const loadUniversity = async () => {
            setLoading(true);
            setErrorStatus(false);
            if (debouncedValue !== '' && debouncedValue.length > 2) {
                const response = await getUniversity(debouncedValue);
                setUniversities(response);
                setLoading(false);
                if (response.length === 0) {
                    setErrorStatus(true)
                }
            } else {
                setUniversities([])
                setLoading(false);
            }
        };

        void loadUniversity();

    }, [debouncedValue])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value)
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedValue = (event.target as HTMLButtonElement).value
        if (inputRef.current?.value) {
            inputRef.current.value = clickedValue
        }
        setUniversities([]);
        //TODO: to return entire object based on name selected apply find function
        onObjectSelected(clickedValue)
    }

    const handleEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && universities.length > 0 && !loading) {
            const selectedValue = universities[0].name;
            if (inputRef.current?.value) {
                inputRef.current.value = selectedValue
            }
            setUniversities([]);
            //TODO: to return entire object  in this case is sufficient universities[0]
            onObjectSelected(selectedValue)
        }
    }

    return ( <div className='container'>
        <div className='container__select'>
            <div className={`search ${errorStatus ? 'search-red' : ''} ${disabled ? 'search-disabled' : ''}`}>
                <input
                    className='search__input'
                    disabled={disabled}
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                    ref={inputRef}
                />
                <label className={`search__label ${errorStatus ? 'search__label-red' : ''}`}>{label}</label>
                {hiddenBox ? <ArrowDown /> : <ArrowUp />}
            </div>
            {errorStatus ? <span className='search__empty'>Nessuna università trovata</span> : null}
        </div>
        {hiddenBox ? null : <div className='options'>
            {loading && <div className='options__loader'>
                <p>Loading..</p>
            </div>}
            {!loading && universities.map((elm, index) =>
                /*in React use index as key is an anti pattern, in this case there is a problem with the api,
                there isn't an id to unique identify react node, solve temporary the problem of duplicate key*/
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                <button key={`elm.name-${index}`} className='options__box' onClick={handleClick} value={elm.name}>
                    {elm.name}
                </button>
            )}
        </div>}
    </div>
    );
};

export default SelectUniversity;
