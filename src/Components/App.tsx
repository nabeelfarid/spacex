import CssBaseline from "@material-ui/core/CssBaseline";
import LaunchList from "./LaunchList";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import LaunchDetails from "./LaunchDetails";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { GitHub } from "@material-ui/icons";
import { Box } from "@material-ui/core";

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
          <AppBar position="relative" color="default">
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                SpaceX
              </Typography>
              <Box flexGrow={1} />
              <IconButton
                aria-label="github"
                href="https://github.com/nabeelfarid/spacex"
                target="blank"
                title="Github Repo"
              >
                <GitHub />
              </IconButton>
            </Toolbar>
          </AppBar>
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
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
