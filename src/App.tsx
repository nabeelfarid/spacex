import CssBaseline from "@material-ui/core/CssBaseline";
import LaunchList from "./Components/LaunchList";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LaunchDetails from "./Components/LaunchDetails";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <BrowserRouter>
            <Container>
              <Switch>
                <Route exact path={["/", "/launches"]}>
                  <LaunchList />
                </Route>
                <Route exact path={["/:id", "/launches/:id"]}>
                  <LaunchDetails />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Container>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
