/* eslint-disable no-case-declarations */
import { DEFAULT_TASKS } from "../../components/TasksView.component";
import { ITask, IUser } from "../../types";

type IState = {
  isLoading: boolean;
  user: IUser | null;
  tasks: ITask[] | null;
  isShowRegisterModal: boolean;
  isShowLoginModal: boolean;
  detailedTaskData: ITask | null;
  isShowCreateTaskModal: boolean;
}

export const defaultAppState: IState = {
  isLoading: false,
  user: null,
  tasks: DEFAULT_TASKS,
  isShowRegisterModal: false,
  isShowLoginModal: false,
  detailedTaskData: null,
  isShowCreateTaskModal: false,
};

// Define the action types
export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: IUser | null }
  | { type: 'SET_TASKS'; payload: ITask[] | null }
  | { type: 'UPDATE_TASK'; payload: ITask}
  | { type: 'DELETE_TASK'; payload: number}
  | { type: 'CREATE_TASK'; payload: ITask }
  | { type: 'SET_SHOW_AUTH_MODAL'; payload: { type: 'login' | 'register'; value: boolean } }
  | { type: 'SET_DETAILED_TASK_DATA', payload: ITask | null }
  | { type: 'SET_SHOW_CREATE_TASK_MODAL', payload: boolean };

// Define the reducer function
export const appReducer = (state: IState, action: Action): IState => {
  let newTasks;
  switch (action.type) {
    case 'SET_SHOW_CREATE_TASK_MODAL':
      return {
        ...state,
        isShowCreateTaskModal: action.payload,
      };
    case 'SET_DETAILED_TASK_DATA':
      return {
        ...state,
        detailedTaskData: action.payload,
      };
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
    case 'UPDATE_TASK':

      const updateTaskIndex = state.tasks?.findIndex((task) => task.id === action.payload.id);  

      newTasks = state.tasks;

      newTasks![updateTaskIndex!] = action.payload; 

      return {
        ...state,
        tasks: newTasks,
      };
    case 'DELETE_TASK':
      // Filter out the task with that id and return new tasks.
      newTasks = state.tasks;

      newTasks = newTasks!.filter((task) => task.id === action.payload);

      return {
        ...state,
        tasks: newTasks,
      };
    case 'CREATE_TASK':
      newTasks = state.tasks;
      newTasks!.push(action.payload);
      return {
        ...state,
        tasks: newTasks,
      };
    case 'SET_SHOW_AUTH_MODAL':
      const type = action.payload.type.charAt(0).toUpperCase() + action.payload.type.slice(1); 
      return {
        ...state,
        [`isShow${type}Modal`]: action.payload.value,
      };
    default:
      return state;
  }
};