import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { deepOrange, green, pink, purple } from "@material-ui/core/colors";
import { Info, Description } from "@material-ui/icons/";
import Image from "material-ui-image";
import { useParams } from "react-router";
import { DEFAULT_IMAGE } from "../Constants";
import { useLaunchDetailsQuery } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  pink: {
    color: "inherit",
    backgroundColor: pink[500],
  },
  green: {
    color: "inherit",
    backgroundColor: green[500],
  },
  deepOrange: {
    color: "inherit",
    backgroundColor: purple[500],
  },
  summary: {
    height: "100%",
  },
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
      {data && data.launch && (
        <div>
          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">{`Mission ${data.launch?.mission_name}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Paper variant="outlined">
                  <Image
                    aspectRatio={4 / 3}
                    color="inherit"
                    imageStyle={{ borderRadius: "4px" }}
                    src={String(data.launch.links?.mission_patch_small)}
                    disableError={true}
                    onError={(e) => {
                      if (e) {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }
                    }}
                    title={data.launch.mission_name?.toString()}
                    alt={data.launch.mission_name?.toString()}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined" className={classes.summary}>
                  <CardHeader
                    title={<Typography variant="h5">Summary</Typography>}
                    avatar={
                      <Avatar className={classes.pink}>
                        <Info />
                      </Avatar>
                    }
                  ></CardHeader>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Launch Site
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {/* {data.launch.launch_site?.site_name_long} */}
                          {data.launch.launch_site?.site_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Site Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.launch_site?.site_name_long}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Launch Date
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {new Date(
                            data.launch?.launch_date_utc
                          ).toDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Mission Status
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body1"
                          color={
                            data.launch.launch_success ? "textPrimary" : "error"
                          }
                        >
                          {data.launch.launch_success ? "Success" : "Failed"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Rocket Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.rocket?.rocket_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Rocket Type
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.rocket?.rocket_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined" className={classes.summary}>
                  <CardHeader
                    title={<Typography variant="h5">Launch Details</Typography>}
                    avatar={
                      <Avatar className={classes.green}>
                        <Description />
                      </Avatar>
                    }
                  ></CardHeader>

                  <CardContent>
                    <Typography align="justify">
                      {data.launch?.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {data.launch.links?.flickr_images
                ?.slice(0, 2)
                .map((image, index) => {
                  return (
                    <Grid item xs={6} key={index}>
                      <Paper variant="outlined">
                        <Image
                          aspectRatio={4 / 3}
                          color="inherit"
                          imageStyle={{ borderRadius: "4px" }}
                          src={String(image)}
                          title={data.launch?.mission_name?.toString()}
                          alt={data.launch?.mission_name?.toString()}
                        />
                      </Paper>
                    </Grid>
                  );
                })}
              <Grid item xs={6}>
                <Card variant="outlined" className={classes.summary}>
                  <CardHeader
                    title={<Typography variant="h5">Rocket Details</Typography>}
                    avatar={
                      <Avatar className={classes.deepOrange}>
                        <Icon className="fas fa-rocket" />
                      </Avatar>
                    }
                  ></CardHeader>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Launch Site
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {/* {data.launch.launch_site?.site_name_long} */}
                          {data.launch.launch_site?.site_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Site Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.launch_site?.site_name_long}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Launch Date
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {new Date(
                            data.launch?.launch_date_utc
                          ).toDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Mission Status
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body1"
                          color={
                            data.launch.launch_success ? "textPrimary" : "error"
                          }
                        >
                          {data.launch.launch_success ? "Success" : "Failed"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Rocket Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.rocket?.rocket_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          noWrap
                        >
                          Rocket Type
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {data.launch.rocket?.rocket_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {data.launch.links?.flickr_images &&
            data.launch.links?.flickr_images.length > 0 && (
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
                                aspectRatio={16 / 9}
                                color="inherit"
                                imageStyle={{ borderRadius: "4px" }}
                                src={String(image)}
                                title={data.launch?.mission_name?.toString()}
                                alt={data.launch?.mission_name?.toString()}
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
