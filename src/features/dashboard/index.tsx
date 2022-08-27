import { useTranslation } from "react-i18next";
import { selectCurrentUser, selectCurrentToken, logOut } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLogoutMutation } from "features/auth/authApiSlice";
import { IUser, Nilable } from "../../app/types";

const Dashboard = () => {
  const user: Nilable<IUser> = useAppSelector(selectCurrentUser);
  const token: Nilable<string> = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const welcome = user ? `welcome ${user.first_name}!` : "welcome";
  const tokenAbbr = `${token?.slice(0, 9)}...`;
  const { t } = useTranslation();

  const handleLogout = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(logOut({}));
    } catch (error) {}
  };

  const content = (
    <section>
      <h1>Dashboard</h1>
      {t("login")}
      <h2>{welcome}</h2>
      <p>{tokenAbbr}</p>
      <button onClick={handleLogout}> LogOut</button>
    </section>
  );

  return content;
};

export default Dashboard;
