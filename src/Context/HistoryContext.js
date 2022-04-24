import { createContext, useReducer, useEffect } from "react";
import { historyReducerFunction } from "../Reducers";
import { useAuth } from "../Hooks";
import { historyActionTypes } from "../Reducers/ActionTypes";
import { getHistoryService } from "../Services";

const initialState = { historyList: [], isLoading: false, error: "", videoId: "" };
const { SET_LOADING, SET_ERROR, SET_HISTORY_LIST } = historyActionTypes;

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
    const [historyState, historyDispatchFunction] = useReducer(historyReducerFunction, initialState);
    const {
        authState: { token },
    } = useAuth();

    useEffect(() => {
        if (token) {
            historyDispatchFunction({ type: SET_LOADING });
            (async () => {
                try {
                    const { status, data } = await getHistoryService({ token });
                    if (status === 200) {
                        historyDispatchFunction({ type: SET_HISTORY_LIST, payload: { historyList: data.history } });
                    }
                } catch (error) {
                    historyDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
                }
            })();
        }
    }, [token]);

    return (
        <HistoryContext.Provider value={{ historyState, historyDispatchFunction }}>{children}</HistoryContext.Provider>
    );
}
