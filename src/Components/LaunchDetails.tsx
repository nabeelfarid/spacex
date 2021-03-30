import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
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

  gridListContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    height: 450,
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
      {error && (
        <Box mt={4} textAlign="center">
          <Typography variant="h4" color="error" gutterBottom>
            ERROR:
          </Typography>

          <Typography component="div">
            <Box letterSpacing={4}>{JSON.stringify(error)}</Box>
          </Typography>
        </Box>
      )}
      {loading && (
        <Box mt={4} textAlign="center">
          <Typography variant="h4" gutterBottom>
            LOADING...
          </Typography>
          <CircularProgress size={100} thickness={4} />
        </Box>
      )}
      {data && (
        <div>
          <Box mt={4}>
            <Grid container spacing={3}>
              {data.launch?.links && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h4">Launch Details</Typography>
                  </Grid>
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
          </Box>
          {data.launch?.links?.flickr_images &&
            data.launch?.links?.flickr_images.length > 0 && (
              <Box mt={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Pictures</Typography>
                  </Grid>
                  {data.launch.links.flickr_images.map((image, index) => {
                    return (
                      <Grid item xs={4} key={index}>
                        <Card variant="outlined">
                          <a
                            href={image ? image : DEFAULT_IMAGE}
                            target="blank"
                          >
                            <CardActionArea>
                              <Image
                                color="inherit"
                                src={image ? image : DEFAULT_IMAGE}
                              />
                            </CardActionArea>
                          </a>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
        </div>
      )}
    </>
  );
};

export default LaunchDetails;
