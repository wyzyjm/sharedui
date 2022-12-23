import { Dispatch, SetStateAction, useState } from "react";

export function useResetState<S>(initialState?: S): [S, Dispatch<SetStateAction<S>>, () => void] {
    const [state, setState] = useState(initialState);
    const resetState = () => setState(initialState);
    return [state, setState, resetState];
}