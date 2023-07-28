import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IAuthFormValue, IAuthLoginFormValue, IAuthRegisterFormValue } from "../types";



type IProps = {
  isShow: boolean;
  isLogin: boolean;
  handleClose: () => void;
  handleSubmitAuthModal: (authValue: IAuthLoginFormValue|IAuthRegisterFormValue) => Promise<void>;
};

const inputClassname =
  "block px-2.5 pb-2.5 pt-4 w-full text-sm w-100 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const alertClassname =
  "text-red-500 border border-red-500 bg-red-100 text-sm p-2 text-center w-100 rounded-md";

const AuthModal: React.FC<IProps> = ({ isShow, isLogin, handleClose, handleSubmitAuthModal }) => {

  // Form state.
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IAuthFormValue>();

  console.log(isLogin)

  const confirmPasswordOptions = {
    validate: (value: string | undefined) => {
      if (!isLogin && watch("password") != value) {
        return "Your passwords do not match";
      }
    },
  };
  console.log(errors)
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Register"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          id="auth-form"
          className="flex flex-col justify-start items-start gap-3"
          onSubmit={handleSubmit(handleSubmitAuthModal)}
        >
          {/* IF IS REGISTER */}
          {!isLogin && (
            <>
              {/* FIRST NAME (if register) */}

              <div className="relative w-100">
                <input
                  id="firstName"
                  className={inputClassname}
                  {...register("firstName", { maxLength: 20 })}
                  placeholder=" "
                />

                <label
                  htmlFor="firstName"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  First Name
                </label>
              </div>

              {/* LAST NAME (if register) */}

              <div className="relative w-100">
                <input
                  id="lastName"
                  className={inputClassname}
                  {...register("lastName", { maxLength: 20 })}
                  placeholder=" "
                />

                <label
                  htmlFor="lastName"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Last Name
                </label>
              </div>
            </>
          )}

          {/* EMAIL */}

          <div className="relative w-100">
            <input
              id="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              className={inputClassname}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          {errors.email && (
            <div className={alertClassname}>{errors.email.message}</div>
          )}

          {/* PASSWORD */}

          <div className="relative w-100">
            <input
              id="password"
              className={inputClassname}
              {...register("password", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "min length is 6",
                },
              })}
              type="password"
              placeholder=" "
            />

            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          {errors.password && (
            <div className={alertClassname}>{errors.password.message}</div>
          )}

          {/* CONFIRM PASSWORD (if register) */}
          {!isLogin && (
            <>
              <div className="relative w-100">
                <input
                  id="confirmPassword"
                  className={inputClassname}
                  {...register("confirmPassword", confirmPasswordOptions )}
                  type="password"
                  placeholder=" "
                />

                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Confirm Password
                </label>
              </div>

              {"confirmPassword" in errors && errors.confirmPassword && (
                <div className={alertClassname}>
                  {errors.confirmPassword.message}
                </div>
              )}
            </>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="bg-gray-400"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          type="submit"
          form="auth-form"
          variant="primary"
          className="bg-blue-400"
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
