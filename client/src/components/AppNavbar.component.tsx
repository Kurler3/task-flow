import { Action } from "../state/app/app.state";
import { IUser } from "../types";

type IProps = {
  user: IUser | null;
  dispatch: React.Dispatch<Action>;
}

const AppNavbar: React.FC<IProps> = ({
  user,
  dispatch,
}) => {

  // Handle show auth modal
  const handleShowAuthModal = (type: 'login' | 'register') => {
    dispatch({
      type: 'SET_SHOW_AUTH_MODAL',
      payload: {
        type: type,
        value: true,
      }
    })
  }

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl text-picton-blue hover:text-picton-blue font-bold">TaskFlow</a>
      </div>

      {/* Nav end */}
      <div className="navbar-end flex justify-center items-center gap-2 mr-4">

        {
          user ?
          (
            <a className="btn bg-picton-blue text-white hover:bg-marian-blue">Logout</a>
          ) :
          (
            <>
              {/* Login */}
              <a onClick={() => handleShowAuthModal('login')} className="btn bg-picton-blue text-white hover:bg-marian-blue">Login</a>
              {/* Register */}
              <a onClick={() => handleShowAuthModal('register')} className="btn btn-secondary text-white">Register</a>
            </>
          )
        }
      </div>
    </div>
  );
}

export default AppNavbar;