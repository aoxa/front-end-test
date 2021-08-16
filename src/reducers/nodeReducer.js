import { GET_NODES } from "../actions/types";

const initialState = {
    nodes: [],
    loading: false
};

export default function reduce( state = initialState, action) {
    switch(action.type) {
        case GET_NODES:            
        return {
            ...state,
            nodes: action.payload.list,
            sort: action.payload.sort,
            page: action.payload.page,
            pageCount: action.payload.pageCount,
            loading: false
        }
        default: return state;
    }
}