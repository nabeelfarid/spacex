import { useLaunchesPastQuery } from "../generated/graphql";

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
      {data &&
        data.launchesPast?.map((launch) => (
          <div key={launch?.id}>
            {launch?.mission_name} - {launch?.launch_year}
          </div>
        ))}
    </div>
  );
};

export default LaunchList;
