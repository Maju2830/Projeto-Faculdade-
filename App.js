import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from './src/routes/stackRoutes';
import {createContext, useMemo, useReducer} from "react";
import AuthContext from "./src/contexts/auth";

export default function App() {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SET_TOKEN':
                    return {
                        ...prevState,
                        apiToken: action.apiToken,
                        isAdmin: action.isAdmin,
                    };
            }
        },
        {
            apiToken: null,
            isAdmin: null,
        }
    );


    const authContext = useMemo(
        () => ({
            setToken: async (apiToken, isAdmin) => {
                dispatch({type: 'SET_TOKEN', apiToken: apiToken, isAdmin: isAdmin});
            },
            getToken: () => {
                return state.apiToken
            },
            getIsAdmin: () => {
                return state.isAdmin
            },
        }),
        [state]
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <StackRoutes token={state.apiToken}></StackRoutes>
            </NavigationContainer>
        </AuthContext.Provider>
    );


}


