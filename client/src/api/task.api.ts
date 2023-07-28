import axios from "axios";
import { API_BASE_URL } from "./constants";
import { ICreateTaskForm, ITask, ITaskFormValue } from "../types";

export const getTasks = async (): Promise<ITask[] | undefined>  => {
  const token = localStorage.getItem("jwtToken");

  if(token) {
    try {
      const tasksResult = await axios.get(`${API_BASE_URL}/task/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return tasksResult.data;  
    } catch (error: any) {
      return error.response.data.message;
    }
  
  }
}


export const createTask = async ( userId:number, createTaskValue: ICreateTaskForm): Promise<ITask | undefined> => {

  const token = localStorage.getItem("jwtToken");

    try {
      const tasksResult = await axios.post(`${API_BASE_URL}/task/create`, {...createTaskValue, userId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return tasksResult.data;  
    } catch (error: any) {
      return error.response.data.message;
    }

  }

export const updateTask = async (taskId: number, taskUpdateData: ITaskFormValue) => {
  const token = localStorage.getItem("jwtToken");
  if(token) {

    try {
      await axios.patch(`${API_BASE_URL}/task/update/${taskId}`, taskUpdateData,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    } catch (error: any) {
      return error.response.data.message;
    }
  

  }
}

export const deleteTask = async (taskId: number) => {
  const token = localStorage.getItem('jwtToken');

  if(token) {

    try {
      await axios.delete(`${API_BASE_URL}/task/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error) {
      return error.response.data.message;
    }

  }
}