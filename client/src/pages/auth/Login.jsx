import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground capitalize">
          sign in
        </h1>
        <p className="mt-2">
          don&apos;t have account?
          <Link
            className="ml-2 font-medium text-primary hover:underline"
            to="/auth/register"
          >
            sign up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"sign in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
