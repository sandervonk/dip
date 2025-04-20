"use client";

import { makePageStream } from "@/app/constants";

import TitleSplash from "@/components/TitleSplash";
import WrappedTextHeader from "@/components/TextHeader";
import CenterImage from "@/components/CenterImage"; // Re-importing CenterImage
import EarthText from "@/components/EarthText"; // Re-importing EarthText
import StatMedia from "@/components/StatMedia";
import StatMany from "@/components/StatMany";
import Hero from "@/../public/img/background.png";
export default makePageStream([
  // 1. Title Splash - Introduce DIP
  {
    component: TitleSplash,
    data: {
      primary: ["Dip", ":", "Let's Dip"],
      secondary:
        "Fostering genuine connections and engagement through shared activities, making team bonding convenient and rewarding.",
      image: Hero,
    },
  },
  // 2. The Problem - Why DIP is needed
  {
    component: WrappedTextHeader,
    data: {
      section: "The Problem",
      header: "Disconnected Teams, Missed Opportunities",
      text: "Many employees, whether hybrid or in-person, feel **disconnected from colleagues** outside of direct work tasks. This social isolation negatively impacts workplace culture, productivity, and satisfaction. Factors like post-pandemic shifts, company size, departmental silos, and ineffective event communication contribute. While strong workplace connections are known to **boost business outcomes** like revenue and retention, current team-building efforts often feel **forced and ineffective**.",
    },
  },
  // 3. EarthText - Contextualizing the Problem (US Focus)
  {
    component: EarthText,
    data: {
      positions: [
        {
          pan: { x: 0, y: 6 },
          pos: { x: 0.5, y: 0, z: 20 },
          rot: { x: -1.75, y: 0, z: 0 },
          sun: { x: 1, y: 2, z: 2 },
          pointerEvents: "none",
          opacity: 1,
          transform: 0.1,
        },
        {
          pan: { x: 0, y: 2 },
          pos: { x: 0.5, y: 0, z: 8 },
          rot: { x: -0.75, y: 0, z: 0 },
          sun: { x: 1, y: 2, z: 2 },
          pointerEvents: "none",
          opacity: 1,
          transform: 0.2,
        },
        {
          pan: { x: 0, y: 1.2 },
          pos: { x: 0.5, y: 0, z: 3 },
          rot: { x: 0, y: 0, z: 0 },
          sun: { x: 2, y: 1, z: 1 },
          pointerEvents: "auto",
          opacity: 1,
          transform: 0.3,
        },
        {
          pan: { x: 0, y: 1.2 },
          pos: { x: 0.5, y: 0, z: 2.5 },
          rot: { x: 0, y: 0, z: 0 },
          sun: { x: 1, y: 2, z: 2 },
          pointerEvents: "auto",
          opacity: 1,
          transform: 0.7,
        },
        {
          pan: { x: 0, y: 0 },
          pos: { x: 0.5, y: 0, z: 12 },
          rot: { x: 0, y: 1, z: 0 },
          sun: { x: 0, y: 3, z: 2 },
          pointerEvents: "none",
          opacity: 0,
          transform: 0.95,
        },
      ],
      section: "The Modern Workplace Challenge",
      header: "Bridging the Connection Gap",
      text: "Across the US, the shift towards hybrid and remote work models, while offering flexibility, has exacerbated feelings of **disconnection** for many employees. Our survey reflects this, with workers rating their connection to colleagues outside of tasks at a mere **2.8 out of 5**. Even for those in-office, large company structures and departmental silos often limit meaningful interaction. This isn't just a social issue; it impacts **morale, teamwork, and ultimately, retention**. DIP aims to address this widespread challenge by creating accessible opportunities for genuine connection.",
    },
  },
  // 4. The Solution - Introducing the DIP Platform
  {
    component: WrappedTextHeader,
    data: {
      section: "Our Solution",
      header: "Introducing DIP: Connect, Engage, Thrive",
      text: "DIP tackles workplace disconnection head-on. Our platform suggests **weekly activities tailored to employee interests**, sparking genuine excitement about socializing. We partner with local businesses to offer **discounted activities**, making participation accessible while supporting the community. A key feature is **integrated photo-sharing**, creating a lasting digital album of shared memories to strengthen bonds. DIP aims to seamlessly integrate with existing workplace tools and provide subtle participation metrics, cultivating **authentic human connections** over forced interactions.",
    },
  },
  // 5. CenterImage - Showcasing DIP Features
  {
    component: CenterImage,
    data: {
      images: [
        {
          src: "/dip/img/center/feature-suggestions.png",
          alt: "DIP Activity Suggestions UI Mockup",
          blurbs: [
            "**Personalized activity suggestions** based on employee interests.",
            "Discover new, exciting things to do *with* colleagues, not just *near* them.",
            "Fosters **genuine enthusiasm** over mandatory fun.",
          ],
        },
        {
          src: "/dip/img/center/feature-partnerships.png",
          alt: "Graphic showing DIP local business partnerships",
          blurbs: [
            "Exclusive **discounts and deals** at local venues.",
            "Supports the **local community** and businesses.",
            "Makes participation **affordable and appealing** (a key motivator!).",
          ],
        },
        {
          src: "/dip/img/center/feature-photos.png",
          alt: "DIP Shared Photo Album UI Mockup",
          blurbs: [
            "**Integrated photo-sharing** for events.",
            "Create lasting **shared memories** together.",
            "Builds a visual history of team bonding, strengthening connections *beyond* the event.",
          ],
        },
        {
          src: "/dip/img/center/feature-integration.png",
          alt: "Icons representing workplace tool integration and subtle metrics",
          blurbs: [
            "Aims for **seamless integration** with existing workplace tools.",
            "Provides **subtle participation insights** without feeling invasive.",
            "Focuses on cultivating **authentic connections**, not just tracking attendance.",
          ],
        },
      ],
    },
  },
  // 6. Survey Intro - Setting context for stats
  {
    component: WrappedTextHeader,
    data: {
      section: "What Employees Think",
      header: "Insights from Our Workforce (n=21)", // Kept sample size note
      text: "We surveyed **21 employees** to understand their current connection levels, interest in a platform like DIP, and what motivates (or hinders) participation in social activities with coworkers. The results highlight a clear need and enthusiasm for a better way to connect.",
    },
  },
  // 7. StatMedia - Combined: Connection, Interest, Impact, Work Env (Using percentages)
  {
    component: StatMedia,
    data: {
      statsTitle: "Current State & Perceived Value",
      stats: [
        {
          stat: {
            number: 2.8,
            after: "/ 5",
            format: { maximumFractionDigits: 1 },
          },
          text: "Average rating of **connection to coworkers** outside of work tasks.",
        },
        {
          stat: {
            number: 67 / 100,
            format: { style: "percent" },
          },
          text: "of employees are **interested** in a platform like DIP.",
        },
        {
          stat: {
            number: 71 / 100,
            format: { style: "percent" },
          },
          text: "believe socializing **improves teamwork/morale**.",
        },
        {
          stat: {
            number: 52 / 100,
            format: { style: "percent" },
          },
          text: "believe it **improves work-life balance**.",
        },
        {
          stat: {
            number: 48 / 100,
            format: { style: "percent" },
          },
          text: "Work **Hybrid**",
        },
        {
          stat: {
            number: 48 / 100,
            format: { style: "percent" },
          },
          text: "Work **In-Person**",
        },
      ],
      media: {
        type: "img",
        src: "/dip/img/stats-overview.png",
        alt: "Graphic illustrating employee connection levels and interest in DIP",
        caption:
          "Employees see room for connection improvement and value the potential impact of socializing.",
      },
    },
  },
  // 8. Conclusion / The Goal - Moved before the final stats section
  {
    component: WrappedTextHeader,
    data: {
      section: "The Goal",
      header: "Cultivating Authentic Connections",
      text: "By understanding what drives participation and addressing the barriers employees face, DIP aims to move beyond forced corporate fun. Our goal is to facilitate **genuine interactions and shared experiences** based on common interests, naturally leading to improved **teamwork, morale, and retention**. Let's DIP into a more connected workplace!",
    },
  },
  // 9. StatMany - Combined: Motivations, Barriers, Interests (Using percentages)
  {
    component: StatMany,
    data: {
      statsTitle: "What Drives (and Hinders) Participation",
      stats: [
        // Motivations
        {
          stat: {
            number: 67 / 100,
            format: { style: "percent" },
          },
          text: "Motivated by **making new friends**.",
        },
        {
          stat: {
            number: 62 / 100,
            format: { style: "percent" },
          },
          text: "Motivated by **free/discounted experiences**.",
        },
        {
          stat: {
            number: 52 / 100,
            format: { style: "percent" },
          },
          text: "Motivated by **trying new things**.",
        },
        // Barriers
        {
          stat: {
            number: 52 / 100,
            format: { style: "percent" },
          },
          text: "Hindered by **lack of time**.",
        },
        {
          stat: {
            number: 52 / 100,
            format: { style: "percent" },
          },
          text: "Hindered by **lack of interest in activities** offered.",
        },
        {
          stat: {
            number: 48 / 100,
            format: { style: "percent" },
          },
          text: "Hindered by **not knowing anyone attending**.",
        },
        // Interests
        {
          stat: {
            number: 67 / 100,
            format: { style: "percent" },
          },
          text: "Interested in **Food experiences**.",
        },
        {
          stat: {
            number: 48 / 100,
            format: { style: "percent" },
          },
          text: "Interested in **Creative workshops**.",
        },
        {
          stat: {
            number: 38 / 100,
            format: { style: "percent" },
          },
          text: "Interested in **Volunteering**.",
        },
        {
          stat: {
            number: 33 / 100,
            format: { style: "percent" },
          },
          text: "Interested in **Outdoor adventures**.",
        },
        {
          stat: {
            number: 33 / 100,
            format: { style: "percent" },
          },
          text: "Interested in **Fitness activities**.",
        },
      ],
    },
  },
]);
