import './App.css'
import AppNavbar from './components/AppNavbar.component'
import UnauthenticatedView from './components/UnauthenticatedView.component';

const App = () => {

  return (
    <div className='h-screen w-screen flex flex-col'>
      <AppNavbar />

      <UnauthenticatedView />
    </div>
  )
}

export default App;
