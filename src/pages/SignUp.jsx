import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.config";

const SignUp = () => {
  const { signUpwithEmail } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photoUrl = form.photo.value;

    await signUpwithEmail(email, password)
      .then((user) => console.log(user.user))
      .catch((err) => console.log(err));

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid justify-items-center mt-10">
      <form className="flex w-[30%] justify-center flex-col gap-4" onSubmit={handleSignUp}>
        {/* Name */}
        <div>
          <div className="mb-2 block">
            <Label value="Your Name" />
          </div>
          <TextInput name="name" type="text" required />
        </div>

        {/* Email */}
        <div>
          <div className="mb-2 block">
            <Label value="Your email" />
          </div>
          <TextInput name="email" type="email" required />
        </div>

        {/* Profile photo */}
        <div>
          <div className="mb-2 block">
            <Label value="Your profile photo" />
          </div>
          <TextInput name="photo" type="url" required />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 block">
            <Label value="Your password" />
          </div>
          <TextInput name="password" id="password1" type="password" required />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUp;
