export const TestData = {
  data: {
    launchesPast: [
      {
        id: "97",
        mission_name: "GPS III SV03 (Columbus)",
        launch_date_utc: "2020-06-30T19:55:00.000Z",
        details:
          "SpaceX launches GPS Block III Space Vehicle 03 from SLC-40, Cape Canaveral AFS aboard a Falcon 9. GPS III is owned and operated by the US Air Force and produced by Lockheed Martin. This is the third GPS III satellite and the second launched by SpaceX. The satellite will be delivered into a MEO transfer orbit. The booster for this mission is expected to land on an ASDS.",
        launch_year: "2020",
        links: {
          mission_patch_small:
            "https://images2.imgbox.com/6d/7e/go9I7pAY_o.png",
          flickr_images: [
            "https://live.staticflickr.com/65535/50065947228_804efe6117_o.jpg",
            "https://live.staticflickr.com/65535/50065947263_e1a6ea1e22_o.jpg",
            "https://live.staticflickr.com/65535/50084627433_89d8915596_o.jpg",
          ],
          video_link: "https://youtu.be/6zr0nfG3Xy4",
          wikipedia: "https://en.wikipedia.org/wiki/GPS_Block_III",
          article_link:
            "https://spaceflightnow.com/2020/06/30/spacex-launches-its-first-mission-for-u-s-space-force/",
          reddit_launch:
            "https://www.reddit.com/r/spacex/comments/hi5hit/rspacex_gps_iii_sv03_columbus_official_launch/",
          __typename: "LaunchLinks",
        },
        __typename: "Launch",
      },
      {
        id: "96",
        mission_name: "Starlink-8 & SkySat 16-18",
        launch_date_utc: "2020-06-13T09:21:00.000Z",
        details:
          "This mission will launch the eighth batch of operational Starlink satellites, which are expected to be version 1.0, from SLC-40, Cape Canaveral AFS. It is the ninth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. This mission is expected to include rideshare payloads, SkySats 16-18, on top of the Starlink stack. The booster for this mission is expected to land an ASDS.",
        launch_year: "2020",
        links: {
          mission_patch_small:
            "https://images2.imgbox.com/9a/96/nLppz9HW_o.png",
          flickr_images: [
            "https://live.staticflickr.com/65535/50009748327_93e52a451f_o.jpg",
          ],
          video_link: "https://youtu.be/8riKQXChPGg",
          wikipedia: "https://en.wikipedia.org/wiki/Starlink",
          article_link:
            "https://spaceflightnow.com/2020/06/13/starlink-satellite-deployments-continue-with-successful-falcon-9-launch/",
          reddit_launch:
            "https://www.reddit.com/r/spacex/comments/h7gqlc/rspacex_starlink_8_official_launch_discussion/",
          __typename: "LaunchLinks",
        },
        __typename: "Launch",
      },
      {
        id: "95",
        mission_name: "Starlink 7",
        launch_date_utc: "2020-06-04T01:25:00.000Z",
        details:
          "This mission will launch the seventh batch of operational Starlink satellites, which are expected to be version 1.0, from SLC-40, Cape Canaveral AFS. It is the eighth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. The booster for this mission is expected to land on JRTI on its first mission since arriving at Port Canaveral.",
        launch_year: "2020",
        links: {
          mission_patch_small:
            "https://images2.imgbox.com/9a/96/nLppz9HW_o.png",
          flickr_images: [
            "https://live.staticflickr.com/65535/49971196871_a0462d0084_o.jpg",
            "https://live.staticflickr.com/65535/49970682603_e6333945ee_o.jpg",
          ],
          video_link: "https://youtu.be/y4xBFHjkUvw",
          wikipedia: "https://somelink.com",
          article_link: "https://somelink.com",
          reddit_launch:
            "https://www.reddit.com/r/spacex/comments/gkfe30/rspacex_starlink_7_official_launch_discussion/",
          __typename: "LaunchLinks",
        },
        __typename: "Launch",
      },
    ],
  },
};

export const TestData_LaunchDetails = {
  data: {
    launch: {
      id: "85",
      mission_name: "CRS-19",
      details:
        "SpaceX's 19th Crew Resupply Mission on behalf of NASA with a total of 20 contracted flights, this mission brings essential supplies to the International Space Station using SpaceX's reusable Dragon spacecraft. The external payloads for this mission include the Hyperspectral Imager Suite and a lithium-ion battery. Falcon 9 and Dragon will launch from SLC-40, Cape Canaveral AFS. The mission will be complete with return and recovery of the Dragon capsule and down cargo.",
      launch_date_utc: "2019-12-05T17:29:23.000Z",
      launch_year: "2019",
      launch_success: true,
      launch_site: {
        site_name: "CCAFS SLC 40",
        site_name_long:
          "Cape Canaveral Air Force Station Space Launch Complex 40",
        __typename: "LaunchSite",
      },
      links: {
        mission_patch: "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
        mission_patch_small: "https://images2.imgbox.com/05/f9/FQWx8g9k_o.png",
        article_link:
          "https://spaceflightnow.com/2019/12/05/dragon-soars-on-research-and-resupply-flight-to-international-space-station",
        flickr_images: [
          "https://live.staticflickr.com/65535/49178460143_e3ae2bd506_o.jpg",
          "https://live.staticflickr.com/65535/49178954221_8544835325_o.jpg",
          "https://live.staticflickr.com/65535/49179161792_9f1801a963_o.jpg",
          "https://live.staticflickr.com/65535/49178460368_62eb945db8_o.jpg",
          "https://live.staticflickr.com/65535/49184948561_ce20b38bc6_o.jpg",
          "https://live.staticflickr.com/65535/49185149122_00a7fa573d_o.jpg",
        ],
        presskit:
          "https://www.spacex.com/sites/spacex/files/crs-19_mission_press_kit.pdf",
        reddit_campaign:
          "https://www.reddit.com/r/spacex/comments/e0upb3/crs19_launch_campaign_thread/",
        reddit_launch:
          "https://www.reddit.com/r/spacex/comments/e5r8hj/rspacex_crs19_official_launch_discussion_updates",
        reddit_media:
          "https://www.reddit.com/r/spacex/comments/e6ln0m/rspacex_crs19_media_thread_videos_images_gifs",
        reddit_recovery:
          "https://www.reddit.com/r/spacex/comments/e6lbzy/rspacex_crs19_booster_recovery_discussion_updates",
        video_link: "https://youtu.be/-aoAGdYXp_4",
        wikipedia: "https://en.wikipedia.org/wiki/SpaceX_CRS-19",
        __typename: "LaunchLinks",
      },
      rocket: {
        rocket_name: "Falcon 9",
        rocket_type: "FT",
        rocket: {
          name: "Falcon 9",
          stages: 2,
          success_rate_pct: 97,
          first_flight: "2010-06-04",
          company: "SpaceX",
          country: "United States",
          cost_per_launch: 50000000,
          description:
            "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
          wikipedia: "https://en.wikipedia.org/wiki/Falcon_9",
          height: {
            meters: 70,
            __typename: "Distance",
          },
          diameter: {
            meters: 3.7,
            __typename: "Distance",
          },
          landing_legs: {
            number: 4,
            material: "carbon fiber",
            __typename: "RocketLandingLegs",
          },
          mass: {
            kg: 549054,
            __typename: "Mass",
          },
          __typename: "Rocket",
        },
        __typename: "LaunchRocket",
      },
      __typename: "Launch",
    },
  },
};
