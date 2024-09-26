import { useReducer } from 'react';
import './index.css';

type Props = {
    updateReducer: (arg0: string, arg1: boolean, arg2: string) => void
    initialConfig: FilterState
}

enum UpdateActionKind {
    LABEL = 'LABEL',
    DISABLED = 'DISABLED',
    ONOBJSELECTED = 'ONOBJSELECTED',
}

type UpdateLabel = {
  type: UpdateActionKind.LABEL;
  payload: string;
}

type UpdateOnObj = {
  type: UpdateActionKind.ONOBJSELECTED;
  payload: string;
}

type UpdateDisabled = {
  type: UpdateActionKind.DISABLED;
  payload: boolean;
}
// A type for our actions
type UpdateAction  = UpdateLabel | UpdateOnObj | UpdateDisabled

// Atype for our state
type FilterState = {
    label: string;
    disabled: boolean;
    onObjSelected: string;
}

function reducer(state: FilterState, action: UpdateAction): FilterState {
    const { type } = action;
    switch (type) {
        case UpdateActionKind.LABEL:
            return {
                ...state,
                label: action.payload
            };
        case UpdateActionKind.DISABLED:
            return {
                ...state,
                disabled: action.payload
            };
        case UpdateActionKind.ONOBJSELECTED:
            return {
                ...state,
                onObjSelected: action.payload
            }
        default:
            return state;
    }
}

const FilterComponent = (props: Props) => {
    const { updateReducer, initialConfig } = props;
    const [state, dispatch] = useReducer(reducer, initialConfig);

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: UpdateActionKind.LABEL, payload: event.target.value })
    }
    
    const handleDisabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: UpdateActionKind.DISABLED, payload: event.target.checked })
    }

    const handleFnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: UpdateActionKind.ONOBJSELECTED, payload: event.target.value })
    }

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        updateReducer(state.label, state.disabled, state.onObjSelected)
    };

    return (
    <form className='form'>
        <div className='form__text'>
            <label htmlFor="fLabel">Label:&nbsp;</label>
                <input type="text" id="fLabel" name="fLabel" defaultValue={state.label} onChange={handleLabelChange} />
            </div>
        <div className='form__checkbox'>
            <label htmlFor="fDisabled">Disabled:&nbsp;</label>
                <input type="checkbox" id="fDisabled" name="fDisabled" onChange={handleDisabledChange} checked={state.disabled} />
        </div>
        <fieldset className='form__radio'>
            <legend>Select a function for onObjectSelected:</legend>
            <div>
                    <input type="radio" id="console" name="fn" value="console" onChange={handleFnChange} checked={ state.onObjSelected === 'console'} />
                <label htmlFor="console">Console.log</label>
            </div>
            <div>
                <input type="radio" id="alert" name="fn" value="alert" onChange={handleFnChange} checked={ state.onObjSelected === 'alert'}/>
                <label htmlFor="alert">Alert</label>
            </div>
        </fieldset>
        <button type="submit"  className='form__submit' value="Submit" onClick={handleSubmit}>Submit</button>
    </form>
    )
}

export default FilterComponent;