import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DescriptionIcon from "@material-ui/icons/Description";
import RedditIcon from "@material-ui/icons/Reddit";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { LaunchFieldsFragment } from "../generated/graphql";
import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Link, useRouteMatch } from "react-router-dom";
import { DEFAULT_IMAGE } from "../Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    // color: "white",
    // backgroundColor: "#515151",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "black",
  },
  // actions: {
  // height: "100%",
  // },
}));

const text_truncate = (str: string, length?: number, ending?: string) => {
  if (length == null) {
    length = 180;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

interface LaunchListItemProps {
  launch: LaunchFieldsFragment;
}

const LaunchListItem: React.FC<LaunchListItemProps> = ({ launch }) => {
  const classes = useStyles();

  const { url } = useRouteMatch();

  // use first flickr image as the main image, otherwise use defaultImage
  const mainImage =
    !!launch?.links?.flickr_images && launch?.links?.flickr_images?.length > 0
      ? String(launch?.links?.flickr_images[0])
      : DEFAULT_IMAGE;

  // use flickr second, otherwise use defaultImage
  const avatarFallback =
    !!launch?.links?.flickr_images && launch?.links?.flickr_images?.length > 1
      ? String(launch?.links?.flickr_images[1])
      : DEFAULT_IMAGE;

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box boxShadow={3} height="100%">
          <Card className={classes.root} variant="outlined">
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={String(launch.links?.mission_patch_small)}
                >
                  <Avatar
                    className={classes.avatar}
                    src={avatarFallback}
                  ></Avatar>
                </Avatar>
              }
              title={launch.mission_name}
              subheader={new Date(launch.launch_date_utc).toDateString()}
            />
            <Link
              to={url === "/" ? `${url}${launch.id}` : `${url}/${launch.id}`}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={mainImage}
                  title={launch.mission_name ? launch.mission_name : ""}
                />
              </CardActionArea>
            </Link>

            <CardContent>
              <Typography variant="body2" component="p" align="justify">
                {!!launch.details ? text_truncate(launch.details) : ""}
              </Typography>
            </CardContent>
            <Box flexGrow={1}></Box>
            <Divider />
            {!!launch.links && (
              <CardActions>
                {!!launch.links.video_link && (
                  <IconButton
                    aria-label="video"
                    title="video"
                    href={launch.links.video_link}
                    target="_blank"
                  >
                    <YouTubeIcon />
                  </IconButton>
                )}
                {!!launch.links.article_link && (
                  <IconButton
                    aria-label="article"
                    title="article"
                    href={launch.links.article_link}
                    target="_blank"
                  >
                    <DescriptionIcon />
                  </IconButton>
                )}
                {!!launch.links.reddit_launch && (
                  <IconButton
                    aria-label="reddit"
                    title="reddit"
                    href={launch.links.reddit_launch}
                    target="_blank"
                  >
                    <RedditIcon />
                  </IconButton>
                )}
                {!!launch.links.wikipedia && (
                  <IconButton
                    aria-label="wikipedia"
                    title="wikipedia"
                    href={launch.links.wikipedia}
                    target="_blank"
                  >
                    <Icon className="fab fa-wikipedia-w" />
                  </IconButton>
                )}
              </CardActions>
            )}
          </Card>
        </Box>
      </Grid>
    </>
  );
};

export default LaunchListItem;