import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { green, pink, purple } from "@material-ui/core/colors";
import { Info, Description, YouTube } from "@material-ui/icons/";
import DescriptionIcon from "@material-ui/icons/Description";
import RedditIcon from "@material-ui/icons/Reddit";
import Image from "material-ui-image";
import { useParams } from "react-router";
import { useLaunchDetailsQuery } from "../generated/graphql";
import Error from "./Error";
import Loader from "./Loader";

const DEFAULT_IMAGE =
  "https://live.staticflickr.com/7855/buddyicons/130608600@N05_r.jpg";

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
    display: "flex",
    flexDirection: "column",
    height: "100%",
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

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {data && data.launch && (
        <div>
          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">{`Mission ${data.launch?.mission_name}`}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
                        <Typography color="textSecondary">
                          Launch Site
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>
                          {data.launch.launch_site?.site_name},{" "}
                          {data.launch.launch_site?.site_name_long}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography color="textSecondary">
                          Launch Date
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>
                          {new Date(
                            data.launch?.launch_date_utc
                          ).toDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography color="textSecondary">
                          Mission Status
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
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
                        <Typography color="textSecondary">Rocket</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>
                          {data.launch.rocket?.rocket_name}{" "}
                          {data.launch.rocket?.rocket_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box flexGrow={1}></Box>
                  <Divider />
                  {data.launch.links && (
                    <CardActions>
                      {data.launch.links.video_link && (
                        <IconButton
                          aria-label="video"
                          title="video"
                          href={data.launch.links.video_link}
                          target="_blank"
                        >
                          <YouTube />
                        </IconButton>
                      )}
                      {!!data.launch.links.article_link && (
                        <IconButton
                          aria-label="article"
                          title="article"
                          href={data.launch.links.article_link}
                          target="_blank"
                        >
                          <DescriptionIcon />
                        </IconButton>
                      )}
                      {!!data.launch.links.reddit_launch && (
                        <IconButton
                          aria-label="reddit"
                          title="reddit"
                          href={data.launch.links.reddit_launch}
                          target="_blank"
                        >
                          <RedditIcon />
                        </IconButton>
                      )}
                      {!!data.launch.links.wikipedia && (
                        <IconButton
                          aria-label="wikipedia"
                          title="wikipedia"
                          href={data.launch.links.wikipedia}
                          target="_blank"
                        >
                          <Icon className="fab fa-wikipedia-w" />
                        </IconButton>
                      )}
                    </CardActions>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6} key={index}>
                      <Paper variant="outlined">
                        <Image
                          aspectRatio={1 / 1}
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
              {data.launch.rocket && data.launch.rocket.rocket && (
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className={classes.summary}>
                    <CardHeader
                      title={
                        <Typography variant="h5">Rocket Details</Typography>
                      }
                      avatar={
                        <Avatar className={classes.deepOrange}>
                          <Icon className="fas fa-rocket" />
                        </Avatar>
                      }
                    ></CardHeader>
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">Name</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">Stages</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.stages}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">
                            First Flight
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {new Date(
                              data.launch.rocket.rocket.first_flight
                            ).toDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">Company</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.company},{" "}
                            {data.launch.rocket.rocket.country}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">
                            Cost Per Launch
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(
                              Number(data.launch.rocket.rocket.cost_per_launch)
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">
                            Success Rate
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.success_rate_pct}%
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">Height</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.height?.meters} meters
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">
                            Diameter
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.diameter?.meters} meters
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">Mass</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.mass?.kg} kg
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography color="textSecondary">
                            Landing Legs
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {data.launch.rocket.rocket.landing_legs?.number}{" "}
                            {data.launch.rocket.rocket.landing_legs?.material}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
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
                      <Grid item xs={12} sm={6} md={4} key={index}>
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
