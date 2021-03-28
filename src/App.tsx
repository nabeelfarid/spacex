import CssBaseline from "@material-ui/core/CssBaseline";
import LaunchList from "./Components/LaunchList";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
          <Container>
            <LaunchList />
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
