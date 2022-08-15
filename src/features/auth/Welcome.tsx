import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
const Welcome = () => {
  const user: any = useAppSelector(selectCurrentUser);
  const token: string | null = useAppSelector(selectCurrentToken);
  const welcome = user ? `welcome ${user.first_name}!` : "welcome";
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>{tokenAbbr}</p>
      <p>
        <Link to="/userslist">user list</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
