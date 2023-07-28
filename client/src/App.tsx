import { useEffect, useReducer } from 'react';
import './App.css'
import AppNavbar from './components/AppNavbar.component'
import UnauthenticatedView from './components/UnauthenticatedView.component';
import { appReducer, defaultAppState } from './state/app/app.state';
import AuthModal from './components/AuthModal.component';
import LoadingScreen from './components/LoadingScreen.component';
import { AuthFormValues, IUser } from './types';
import { loginApi, registerApi } from './api';
import TasksView from './components/TasksView.component';
import {  isTokenValid } from '../utils/functions';
import { getUserWithJwt } from './api/user.api';


const App = () => {

  // Init app state.
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  // Handle close auth modal.
  const handleCloseAuthModal = () => {

    dispatch({
      type: 'SET_SHOW_AUTH_MODAL',
      payload: {
        type: state.isShowLoginModal ? 'login' : 'register',
        value: false,
      }
    });
  }

  // Handle close detailed task modal.
  const handleCloseDetailedTaskModal = () => {
    dispatch({
      type: 'SET_DETAILED_TASK_DATA',
      payload: null,
    });
  }

  // Handle Login 
  const handleSubmitAuthModal = async (authValue: AuthFormValues<typeof state.isShowLoginModal>) => {
    console.log(authValue);

    let user: IUser | undefined;

    // Set app loading to true
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    // Try to login user
    try {

      // If login => get tokens and then user
      if (
        state.isShowLoginModal
      ) {
        // If register => get user directly
        const tokens = await loginApi(authValue);
      
        // Call the /user/me route to get the user with this access_token.
        user = await getUserWithJwt(tokens.access_token);

        localStorage.setItem("jwtToken", tokens.access_token);

      } else {

        // Create user and get it back
        user = await registerApi(authValue);

      }

      if (user) {

        // Set user in the app state.
        dispatch({
          type: 'SET_USER',
          payload: user!,
        });

        // Hide the auth moda.
        dispatch({
          type: 'SET_SHOW_AUTH_MODAL',
          payload: {
            type: state.isShowLoginModal ? 'login' : 'register',
            value: false,
          }
        });
      }


    } catch (error) {

      // Show error if any
      console.error(error);

    } finally {
      // Set loading to false.
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });

    }

  }

  // Handle check jwt
  const handleCheckJwt = async () => {
    // Check for the token in local storage
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });

      try {
        // Check if the stored token is valid
        const user = await isTokenValid(storedToken);

        if (user) {

          dispatch({
            type: 'SET_USER',
            payload: user,
          });

        } else {
          // If the token is invalid, remove it from local storage
          localStorage.removeItem('jwtToken');
        }

      } catch (error) {

        console.error(error);

      } finally {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      }
    }
  }

  // Check if has jwt (send request to server to get current user if has)
  useEffect(() => {
    handleCheckJwt();
  }, [])

  return (
    <>

      {/* TaskView / Unauthenticated View */}
      <div className='h-screen w-screen flex flex-col'>
        <AppNavbar dispatch={dispatch} user={state.user} />

        <div className="bg-indigo w-100 h-100 flex justify-center items-center flex-1">
          {
            state.user ?
              (
                <TasksView
                  tasks={state.tasks!}
                  dispatch={dispatch}
                  handleCloseDetailedTaskModal={handleCloseDetailedTaskModal}
                  detailedTaskData={state.detailedTaskData}
                  isShowCreateTaskModal={state.isShowCreateTaskModal}
                />
              ) :
              (
                <UnauthenticatedView />
              )
          }
        </div>

      </div>

      {/* Auth Modal */}
      <AuthModal
        isShow={
          state.isShowLoginModal || state.isShowRegisterModal
        }
        isLogin={
          state.isShowLoginModal
        }
        handleClose={handleCloseAuthModal}
        handleSubmitAuthModal={handleSubmitAuthModal}
      />

      {/* Loading screen */}
      {
        state.isLoading && <LoadingScreen />
      }
    </>
  )
}

export default App;
