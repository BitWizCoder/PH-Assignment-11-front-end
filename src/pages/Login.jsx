import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithEmail, googleLogin } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmail(email, password)
      .then((user) => {
        console.log(user.user);
        navigate(location?.state ? location?.state : "/");
        // Get acces token
        axios
          .post(`/jwt`, { email: email }, { withCredentials: true })
          .then((res) => {
            console.log("token:", res.data);
            localStorage.setItem("token", JSON.stringify(res.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        toast.success("LoggedIn successfully");

        axios
          .post(`/jwt`, { email: res.email }, { withCredentials: true })
          .then((res) => {
            console.log("token:", res.data);
            localStorage.setItem("token", JSON.stringify(res.data));
          })
          .catch((err) => console.log(err));

        navigate(location?.state ? location?.state : "/");
      })
      .catch((err) => {
        // const errorCode = err.code;
        const errorMessage = err.message;
        toast.success(errorMessage);
        // console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="grid justify-items-center mt-10">
      <form
        className="flex w-[30%] justify-center flex-col gap-4"
        onSubmit={handleLogin}
      >
        {/* Email */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            defaultValue={"satepe1107@kkoup.com"}
            name="email"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            defaultValue={"thanks"}
            name="password"
            id="password1"
            type="password"
            required
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <Button color="gray" onClick={handleGoogleLogin}>
          {"  "}
          <AiFillGoogleCircle className="text-2xl" /> Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
