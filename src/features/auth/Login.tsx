import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useAppDispatch } from "../../app/hooks";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email: user, password: pwd }).unwrap();
      console.log(`🚀 - file: Login.tsx - line 30 - userDate`, userData.data);
      dispatch(loginAction({ ...userData.data }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err: any) {
      if (!err?.originalStatus) {
        setErrMsg("No server response");
      } else if (err.originalStatus?.status === 400) {
        setErrMsg("missing username or password");
      } else if (err.originalStatus?.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("login Failed");
      }
      errRef.current?.focus();
    }
  };
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Logging in </h1>
  ) : (
    <div>
      <p ref={errRef}>{errMsg}</p>
      <form onSubmit={handleSubmit}>
        username:
        <input
          type="email"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        password:
        <input type="password" id="password" value={pwd} onChange={handlePwdInput} required />
        <button>sign in</button>
      </form>
    </div>
  );

  return content;
};

export default Login;
