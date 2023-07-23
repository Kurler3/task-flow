import { ITask, IUser } from "../../types";
import APP_ACTIONS from "./app.actions";

type IState = {
  isLoading: boolean;
  user: IUser | null;
  tasks: ITask[] | null;
}

export const defaultAppState: IState = {
  isLoading: false,
  user: null,
  tasks: null,
}

// Define the action types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: IUser | null }
  | { type: 'SET_TASKS'; payload: ITask[] | null };

// Define the reducer function
export const appReducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};