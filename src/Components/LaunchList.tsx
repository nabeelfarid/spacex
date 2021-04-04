import { useLaunchesPastQuery } from "../generated/graphql";
import LaunchListItem from "./LaunchListItem";
import { Grid, Box, Typography } from "@material-ui/core";
import Error from "./Error";
import Loader from "./Loader";

const LaunchList = () => {
  const { data, loading, error } = useLaunchesPastQuery();

  return (
    <div>
      {error && <Error error={error} />}
      {loading && <Loader />}
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
