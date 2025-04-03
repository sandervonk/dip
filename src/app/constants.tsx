//* Import components for pages
import TitleSplash from "@/components/TitleSplash";
import WrappedTextHeader from "@/components/TextHeader";
import CenterImage from "@/components/CenterImage";
import EarthText from "@/components/EarthText";
import StatMediaSplit from "@/components/StatMediaSplit";
// import ImageToContact from "@/components/ImageToContact";
const ImageToContact = null;

//* Import images for pages
import PaddiesImage from "@/../public/img/paddies.webp";

//* Page flow; ** around text is green, * is full opacity white, default is grey
export const nav = {
  title: "World x Change",
};
export const pages = [
  {
    component: TitleSplash,
    data: {
      primary: nav.title.split(" "),
      secondary: "An Information-Age Solution to the Tragedy of the Commons",
      image: PaddiesImage,
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "The Idea",
      header: "Realign individual incentives to reflect global impacts",
      text: "An automated system leverages remote sensing and international markets to enable **payments to indigenous stewards** who enhance the global commons.",
    },
  },
  {
    component: CenterImage,
    data: {
      images: [
        {
          src: "/img/center/flowchart.png",
          alt: "Flowchart",
          blurbs: [
            "*Frontier science* creates **a bottom-up solution**  to the Tragedy of the Commons.",
            "*Integrating ideas* from agriculture, anthropology, chemistry, complex systems, computer science, earth science, ecology, engineering, economics, and finance.",
            "Driven by an *Information-Age infrastructure* that is **easy to scale with wide applicability.**",
            "Alters incentives to **enhance the global commons** rather than destroy it.",
          ],
        },
        {
          src: "/img/center/cylinder.png",
          alt: "Methane Measurement",
          blurbs: [
            "*World class measurements* of the impacts and actions of environmental stewards.",
            "Creating a new standard for documenting **world-enhancing activities.**",
          ],
        },
        {
          src: "/img/center/remote-sensing-before.png",
          alt: "Sensing Before",
          blurbs: [
            "Remote sensing provides the *necessary monitoring, verification, and reporting* of successful environmental stewardship.",
          ],
        },
        {
          src: "/img/center/remote-sensing-after.png",
          alt: "Sensing After",
          blurbs: [
            "Providing high-quality results that **can be trusted** by patrons and markets.",
          ],
        },
      ],
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "World Improving Numbers",
      header: "WINS",
      text: "Our remote sensing generates trustworthy WINs that translate the actions of the stewards into **measurable outcomes** such as tonnes of CO2e avoided or the amount of forest preserved in a natural state. High quality **WINS generate payments for the stewards** from various patrons and markets.",
    },
  },
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
      section: "A Pilot Project",
      header: "Bali, Indonesia",
      text: "Rice has been **sustainably farmed on Bali for over a millennium.**  Unfortunately, the flooded paddies produce methane, a dangerous greenhouse gas.  However, rice is water tolerant not water loving.  **Indigenous farmers can mitigate methane emissions** by changing how they irrigate their rice paddies, but such changes involve risk and extra effort. Incentive payments will help the farmers adapt their thousand-year old system of agriculture into a new regime of global sustainabilty.",
    },
  },
  {
    component: StatMediaSplit,
    data: {
      statsTitle: "Rice and the Global Commons",
      stats: [
        {
          stat: {
            before: ">",
            number: 10,
            after: "%",
          },
          text: "Rice farming *produces over 10%* of world-wide, anthropogenic methane emissions.",
        },
        {
          stat: {
            number: 28,
            after: "x",
          },
          text: "*Methane has 28 times the Global Warming Potential of CO2.* While methane has a limited lifetime in the atmosphere relative to CO2, the additional warming caused by *methane may push the global system beyond critical tipping points.*",
        },
        {
          stat: {
            number: 75,
            after: "%",
          },
          text: "Methane emissions can be **reduced by over 75%** by not keeping the paddies continuously flooded.  This also reduces the runoff of fertilizer that damages Bali's coral reefs.",
        },
      ],
      media: {
        type: "video",
        src: "/media/video.mp4",
        placeholder: "/media/video-placeholder.png",
        alt: "Video caption",
      },
    },
  },
  {
    component: CenterImage,
    data: {
      images: [
        {
          src: "/img/center/field-measurement.png",
          alt: "Piccarro",
          blurbs: [
            "In-field gas analyzers *track emissions* from adjacent fields that use different irrigation practices.",
            "Such world-class *measurements provide critical insights* not available using the current standards of syringe sampling or national averages.",
          ],
        },
        {
          src: "/img/center/subak-bena.png",
          alt: "Subak Bena",
          blurbs: [
            "The project requires a *deep understanding* of the local people, culture, and institutions.",
            "Incorporating such insights **strengthens local traditions and organizations.**",
          ],
        },
        {
          src: "/img/center/somya-pertiwi.png",
          alt: "Somya Pertiwi",
          blurbs: [
            "The project *embraces and integrates* **local leadership.**",
            "The Balinese NGO, *Somya Pertiwi* (**Kindness of the Earth Goddess**), leads the project.",
            "Somya Pertiwi is working within the **centuries old system of communally-governed subaks** that coordinate the irrigation of the rice paddies.",
            "Agricultural extension agents *monitor and consult* on the new farming practices.",
          ],
        },
      ],
    },
  },
  {
    component: StatMediaSplit,
    data: {
      statsTitle: "A Letter to the Future...",
      stats: [
        {
          stat: {
            number: In 2012,
            format: { useGrouping: false },
          },
          text: "is when the **long-term sustainability of the subak system** was recognized by the *UNESCO World Heritage Convention* as proposed by Somya Pertiwi.",
        },
        {
          stat: { number: 19 },
          text: "**subaks** forming the UNESCO World Heritage site *will participate in the pilot project.*",
        },
        {
          stat: { number: 3 },
          text: 'causes for well being are captured in the Balinese philosophy of *Try Hita Karana:* that encourages **harmony among people, nature, and the gods.**',
        },
      ],
      media: {
        type: "img",
        src: "/img/plaque.png",
        alt: "Plaque Alt Text",
      },
    },
  },
  {
    component: ImageToContact,
    data: {
      src: "../path/to/plaque",
      alt: "Plaque caption",
      people: [
        {
          position: [],
          name: "First Last",
          text: "Personal Text",
          contact: "Contact Info",
        },
        {
          position: [],
          name: "First Last",
          text: "Personal Text",
          contact: "Contact Info",
        },
      ],
    },
  },
];

import React, { useLayoutEffect, useState } from "react";
import styles from "@/app/TextStyles.module.scss";
import reactStringReplace from "react-string-replace";
/** Format text to nested spans with the following markdown-like properties:
 * | parent -> <span className={styles.grey}>(</span>
 * | **text** -> <span className={styles.green}>text</span>
 * | *text* -> <span className={styles.white}>text</span>
 */
export function ColorText(text: string, greyBase: boolean = true) {
  const green = /\*\*([^*]+)\*\*/g;
  const white = /\*([^*]+)\*/g;
  let content = reactStringReplace(text, green, (match, i, o) => (
    <span key={["green", i, o].join("-")} className={styles.green}>
      {match}
    </span>
  ));
  content = reactStringReplace(content, white, (match, i, o) => (
    <span key={["white", i, o].join("-")} className={styles.white}>
      {match}
    </span>
  ));
  return <span className={greyBase ? styles.grey : undefined}>{content}</span>;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
