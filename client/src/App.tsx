import { useReducer } from 'react';
import './App.css'
import AppNavbar from './components/AppNavbar.component'
import UnauthenticatedView from './components/UnauthenticatedView.component';
import { appReducer, defaultAppState } from './state/app/app.state';
import AuthModal from './components/AuthModal.component';


const App = () => {

  // Init app state.
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  // Handle close auth modal.
  const handleCloseAuthModal = () => {
    console.log("Close auth modal!");
  }

  return (
    <div className='h-screen w-screen flex flex-col relative'>
      <AppNavbar dispatch={dispatch} user={state.user}/>
      {
        state.isLoading ?
        (
          <div>Loading...</div>
        )
        :
        state.user ?
        (
          <div>Logged in!</div>
        ) :
        (
          <UnauthenticatedView />
        )
      }

      <AuthModal 
        isShow={
          state.isShowLoginModal || state.isShowRegisterModal
        }
        isLogin={
          state.isShowLoginModal
        }
        handleClose={handleCloseAuthModal}
      />
    </div>
  )
}

export default App;
