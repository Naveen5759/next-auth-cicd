import { ReactNode } from "react";

export default function SignupLayout(props: { children: ReactNode }) {
  return (
    <>
      <h1>Signup</h1>
      <p>Please fill in the form below to create an account.</p>
      {props.children}
    </>
  );
}
