import { selectCurrentUser, selectCurrentToken, logOut } from "./authSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLogoutMutation } from "./authApiSlice";
import { IUser, Nilable } from "../../app/types";

const Welcome = () => {
  const user: Nilable<IUser> = useAppSelector(selectCurrentUser);
  const token: Nilable<string> = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const welcome = user ? `welcome ${user.first_name}!` : "welcome";
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  const handleLogout = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(logOut({}));
    } catch (error) {}
  };
  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>{tokenAbbr}</p>
      <button onClick={handleLogout}> LogOut</button>
      <p>
        <Link to="/userslist">user list</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
