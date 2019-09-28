import React, { createContext, useReducer } from 'react';

export const TopicContext = createContext({});
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
const reducer = (state, action) => {
    switch(action.type){
        case UPDATE_TOPIC:
             return action.otherTopic;
        default:
            return state;
    }
}
export const TopicReducer=props=>{
    const [otherTopic, dispatch] = useReducer(reducer, <div />)
    return(
        <TopicContext.Provider value={{otherTopic, dispatch}}>
            {props.children}
        </TopicContext.Provider>
    )
}