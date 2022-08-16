import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { IUser } from "../../app/types";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, isSuccess }] = useLoginMutation();
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
      const userInfo: IUser = await login({ email: user, password: pwd }).unwrap();
      dispatch(loginAction(userInfo));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err: any) {
      console.log(`🚀 - file: Login.tsx - line 37 - err`, err);
      if (!err?.status) {
        setErrMsg("No server response");
      } else if (err.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("login Failed");
      }
    }
  };
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

  const content =
    isLoading || isSuccess ? (
      <h1>Logging in </h1>
    ) : (
      <div>
        <p>{errMsg}</p>
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
