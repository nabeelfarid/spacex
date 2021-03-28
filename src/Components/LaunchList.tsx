import { useLaunchesPastQuery } from "../generated/graphql";
import LaunchListItem from "./LaunchListItem";
import Grid from "@material-ui/core/Grid";

const LaunchList = () => {
  const { data, loading, error } = useLaunchesPastQuery();

  return (
    <div>
      <h1>SpaceX Launches</h1>
      {loading && <div>LOADING...</div>}
      {error && (
        <div>
          ERROR:
          <pre>{JSON.stringify(error)}</pre>{" "}
        </div>
      )}
      {data && (
        <Grid container spacing={3}>
          {data.launchesPast?.map((launch) => {
            return !!launch && <LaunchListItem launch={launch} />;
          })}
        </Grid>
      )}
    </div>
  );
};

export default LaunchList;
