import { useReducer } from 'react';
import './App.css'
import AppNavbar from './components/AppNavbar.component'
import UnauthenticatedView from './components/UnauthenticatedView.component';
import { appReducer, defaultAppState } from './state/app/app.state';
import AuthModal from './components/AuthModal.component';
import LoadingScreen from './components/LoadingScreen.component';


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

  // Handle Register


  // Check if has jwt (send request to server to get current user if has)
  

  return (
    <>
      <div className='h-screen w-screen flex flex-col'>
        <AppNavbar dispatch={dispatch} user={state.user}/>
        {
          state.user ?
          (
            <div>Logged in!</div>
          ) :
          (
            <UnauthenticatedView />
          )
        }
      </div>

      <AuthModal 
        isShow={
          state.isShowLoginModal || state.isShowRegisterModal
        }
        isLogin={
          state.isShowLoginModal
        }
        handleClose={handleCloseAuthModal}
      />

      {
        state.isLoading && <LoadingScreen />
      }
    </>
  )
}

export default App;
