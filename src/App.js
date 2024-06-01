import "./App.css";
import { AppRoutes } from './routes'
import { GlobalStyle } from "./App.styles";

function App() {
  return (
    <div>
      <GlobalStyle />
      <AppRoutes />
    </div>
  );
}

export default App;
