import { SET_REPO } from './actions';
import { JobsType } from './enums/jobs-type.enum';

export interface IAppState {
    repo: JobsType;
}

export const INITIAL_STATE: IAppState = {
    repo: JobsType.frontEnd
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case SET_REPO:

            return { ...state, repo: action.repo }
        
       }
    return state;
}