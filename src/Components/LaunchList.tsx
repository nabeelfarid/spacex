import { useLaunchesPastQuery } from "../generated/graphql";
import LaunchListItem from "./LaunchListItem";
import { Grid, Box, CircularProgress, Typography } from "@material-ui/core";

const LaunchList = () => {
  const { data, loading, error } = useLaunchesPastQuery();

  return (
    <div>
      {error && (
        <Box mt={4} textAlign="center" role="error-panel">
          <Typography variant="h4" color="error" gutterBottom>
            ERROR:
          </Typography>

          <Typography component="div">
            <Box letterSpacing={4}>{JSON.stringify(error)}</Box>
          </Typography>
        </Box>
      )}
      {loading && (
        <Box mt={4} textAlign="center" role="loading-panel">
          <Typography variant="h4" gutterBottom>
            LOADING...
          </Typography>
          <CircularProgress size={100} thickness={4} />
        </Box>
      )}
      {data && (
        <Box mt={4} role="data-panel">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" role="heading">
                SpaceX Launches
              </Typography>
            </Grid>
            {data.launchesPast?.map((launch) => {
              return (
                !!launch && <LaunchListItem launch={launch} key={launch.id} />
              );
            })}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default LaunchList;
