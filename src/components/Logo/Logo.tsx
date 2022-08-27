import logo from "assets/images/logo_with_name.svg";
import config from "config";
const Logo = () => {
  return <img src={logo} alt={config.appName} width={150} />;
};

export default Logo;
