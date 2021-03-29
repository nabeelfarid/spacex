import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Image from "material-ui-image";
import { useParams } from "react-router";
import { DEFAULT_IMAGE } from "../Constants";
import { useLaunchDetailsQuery } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "100%",
    width: "100%",
    // paddingTop: "56.25%", // 16:9
  },
}));

const LaunchDetails = () => {
  const classes = useStyles();

  let { id } = useParams<{ id: string }>();
  const { data, loading, error } = useLaunchDetailsQuery({
    variables: {
      id: id,
    },
  });
  console.log("data:", data);

  // use first flickr image as the main image, otherwise use defaultImage
  const mainImage =
    data &&
    data.launch?.links?.flickr_images &&
    data.launch?.links?.flickr_images?.length > 0
      ? String(data.launch?.links?.flickr_images[0])
      : DEFAULT_IMAGE;

  return (
    <>
      <h1>Launch Details</h1>
      {error && (
        <div>
          ERROR:
          <pre>{JSON.stringify(error)}</pre>
        </div>
      )}
      {loading && <div>LOADING...</div>}
      {data && (
        <div>
          <Grid container spacing={2}>
            {data.launch?.links && (
              <>
                {/* <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardMedia
                      component="img"
                      src={String(data.launch.links.mission_patch_small)}
                      title={
                        data.launch.mission_name
                          ? data.launch.mission_name
                          : "SpaceX"
                      }
                      alt={
                        data.launch.mission_name
                          ? data.launch.mission_name
                          : "SpaceX"
                      }
                      height="100%"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                  </Card>
                </Grid> */}
                <Grid item xs={6}>
                  <Paper variant="outlined">
                    <Image
                      color="inherit"
                      imageStyle={{ borderRadius: "4px" }}
                      src={String(data.launch.links.mission_patch_small)}
                      disableError={true}
                      onError={(e) => {
                        if (e) {
                          e.currentTarget.src = mainImage;
                        }
                      }}
                      title={
                        data.launch.mission_name
                          ? data.launch.mission_name
                          : "SpaceX"
                      }
                      alt={
                        data.launch.mission_name
                          ? data.launch.mission_name
                          : "SpaceX"
                      }
                    />
                  </Paper>
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardHeader
                  title={`Mission: ${data.launch?.mission_name}`}
                  subheader={`Launch Date: ${new Date(
                    data.launch?.launch_date_utc
                  ).toDateString()}`}
                ></CardHeader>
                <CardContent>
                  <Typography>{data.launch?.details}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default LaunchDetails;
