import ThemeCustomization from "./themes";
import Routes from "routes";
import { Suspense } from "react";
import Loader from "components/Loader";
function App() {
  return (
    <ThemeCustomization>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </ThemeCustomization>
  );
}

export default App;
