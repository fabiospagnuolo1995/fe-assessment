import { useState } from 'react';
import SelectUniversity from "@components/select-university/select-university";
import FilterComponent from "./components/filters/filters";

const initialConfig = { label: 'Università del mondo', disabled: false, onObjSelected: 'console' }

const Logger = (value: string) => { console.log(value); };

const Alert = (value: string) => { alert(value); };

type Mapper = {
    [key: string]: (value: string) => void,
}

const mapper: Mapper = {
    console: Logger,
    alert: Alert
}

//In this page you can configure select university component based on its props
const HomePage = () => {
    const [label, setLabel] = useState<string>(initialConfig.label);
    const [disabled, setDisabled] = useState<boolean>(initialConfig.disabled);
    const [onObjectSelected, setOnObjectSelected] = useState<string>(initialConfig.onObjSelected);

    //TODO: Instead of single value pass store reducer object
    const updateReducer = (arg0: string, arg1: boolean, arg2: string) => {
        setLabel(arg0);
        setDisabled(arg1);
        setOnObjectSelected(arg2);
    };
    return <>
        <h1>Module Playground</h1>
        <FilterComponent updateReducer={updateReducer} initialConfig={initialConfig} />
        <SelectUniversity disabled={disabled} label={label} onObjectSelected={mapper[onObjectSelected]} key={onObjectSelected} />
    </>
};

export default HomePage;
