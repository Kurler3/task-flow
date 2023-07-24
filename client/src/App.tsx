import { useReducer } from 'react';
import './App.css'
import AppNavbar from './components/AppNavbar.component'
import UnauthenticatedView from './components/UnauthenticatedView.component';
import { appReducer, defaultAppState } from './state/app/app.state';
import AuthModal from './components/AuthModal.component';
import LoadingScreen from './components/LoadingScreen.component';
import { IAuthFormValue, IUser } from './types';
import { loginApi, registerApi } from './api';
import TasksView from './components/TasksView.component';


const App = () => {

  // Init app state.
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  // Handle close auth modal.
  const handleCloseAuthModal = () => {
    console.log("Close auth modal!");

    dispatch({
      type: 'SET_SHOW_AUTH_MODAL',
      payload: {
        type: state.isShowLoginModal ? 'login' : 'register',
        value: false,
      }
    });
  }

  // Handle Login 
  const handleSubmitAuthModal = async (authValue: IAuthFormValue) => {
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
      if(
        state.isShowLoginModal
      ) {
        // If register => get user directly

        const tokens = await loginApi(authValue);

        // Set the access_token in the cookies/local storage.
        console.log(tokens);

        // Call the /user/me route to get the user with this access_token.
      } else {

        // Create user and get it back
        user = await registerApi(authValue);

      }

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

  // Check if has jwt (send request to server to get current user if has)
  

  return (
    <>
      <div className='h-screen w-screen flex flex-col'>
        <AppNavbar dispatch={dispatch} user={state.user}/>

        <div className="bg-indigo w-100 h-100 flex justify-center items-center flex-1">
          {
            !state.user ?
            (
              <TasksView 
                tasks={state.tasks!}
              />
            ) :
            (
              <UnauthenticatedView />
            )
          }
        </div>
        
      </div>

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

      {
        state.isLoading && <LoadingScreen />
      }
    </>
  )
}

export default App;
