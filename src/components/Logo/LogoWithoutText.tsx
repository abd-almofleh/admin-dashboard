import logo from "assets/images/logo.png";
import config from "config";
const LogoWithoutText = () => {
  return <img src={logo} alt={config.appName} width={50} />;
};
export default LogoWithoutText;
