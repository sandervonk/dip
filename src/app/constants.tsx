//* Import components for pages
import TitleSplash from "@/components/TitleSplash";
import WrappedTextHeader from "@/components/TextHeader";
// import CenterImage from "@/components/CenterImage";
import EarthText from "@/components/EarthText";
// import ImageToContact from "@/components/ImageToContact";
const CenterImage = null,
  ImageToContact = null;

//* Import images for pages
import PaddiesImage from "@/../public/img/paddies.png";

//* Page flow; ** around text is green, * is full opacity white, default is grey
export const pages = [
  {
    component: TitleSplash,
    data: {
      primary: ["World", "x", "Change"],
      secondary: "An Information-Age Solution to the Tragedy of the Commons",
      image: PaddiesImage,
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "The Idea",
      header: "Realign individual incentives with global consequences",
      text: "An automated system uses remote sensing to support payments from international markets to **reward the indigenous land stewards** who improve the global commons.",
    },
  },
  {
    component: CenterImage,
    data: {
      images: [
        {
          src: "../path/to/cylinder",
          alt: "Scientists collect measurment data from a methane probe",
          blurbs: [
            "*World class measurements* of greenhouse gas emissions, producing a **new standard** for verifying emissions",
            "*Measurements provide critical information* not available with the current standards of syringe samples or national averages.",
            "*A continuous gas analyzer* allows us to compare emissions from alternative agricultural practices on Balinese rice paddies.",
          ],
        },
        {
          src: "../path/to/imaging-one",
          alt: "alt caption",
          blurbs: [
            "Remote sensing provides the *necessary monitoring and reporting* of the mitigation efforts, resulting in high-quality results that can be trusted by markets",
          ],
        },
        {
          src: "../path/to/imaging-one",
          alt: "alt caption",
          blurbs: [
            "Having *high quality monitoring, verification, and reporting of the actions* of the stewards engenders the needed trust",
            "Remote sensing allows us to achieve these ideals and ensure the *quality of the claimed results*",
          ],
        },
        {
          src: "../path/to/subak",
          alt: "subak caption",
          blurbs: [
            "Implementing these projects require a deep understanding of, and interaction with, the *local people, cultures, and institutions*",
            "The *needs of the indigenous land stewards* need to be fully appreciated and addressed",
          ],
        },
        {
          src: "../path/to/group",
          alt: "group picture caption",
          blurbs: [
            "*Local leadership and institutions* need to be fully embraced and integrated into the project",
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
      text: "Our remote sensing generates WINs that translate the actions of the stewards into measurable outcomes: CO2e tonnes avoided, amount of forests preserved in a natural state, land left fallow,... \n\nMarkets recognize the value of the WINs, generating payments for stewards.",
    },
  },
  {
    component: EarthText,
    data: {
      positions: [
        {
          pan: { x: 0, y: 3 },
          pos: { x: 0.5, y: 0, z: 1 },
          rot: { x: -0.75, y: 0, z: 0 },
          sun: { x: 1, y: 2, z: 2 },
          transform: 0.3,
        },
        {
          pan: { x: 0, y: 1.25 },
          pos: { x: 0.5, y: 0, z: 2.25 },
          rot: { x: 0, y: 0, z: 0 },
          sun: { x: 2, y: 1, z: 1 },
          transform: 0.5,
        },
        {
          pan: { x: 0, y: 1.25 },
          pos: { x: 0.5, y: 0, z: 2.5 },
          rot: { x: 0, y: 0, z: 0 },
          sun: { x: 1, y: 2, z: 2 },
          transform: 0.7,
        },
        {
          pan: { x: 0, y: 0 },
          pos: { x: 0.5, y: 0, z: 10 },
          rot: { x: 0, y: 1, z: 0 },
          sun: { x: 0, y: 3, z: 2 },
          transform: 1,
        },
      ],
      section: "A Pilot Project",
      header: "Bali, Indonesia",
      text: "Rice has been sustainably farmed on Bali for over a thousand years. However, the flooded paddies produce a dangerous greenhouse gas. Rice is water tolerant, not water loving, so by altering how they grow rice the indigenous farmers can mitigate their greenhouse gas emissions.",
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

import React from "react";
import styles from "./TextStyles.module.scss";
import reactStringReplace from "react-string-replace";
/** Format text to nested spans with the following markdown-like properties:
 * | parent -> <span className={styles.grey}>(</span>
 * | **text** -> <span className={styles.green}>text</span>
 * | *text* -> <span className={styles.white}>text</span>
 */
export function ColorText(text: string, greyBase: boolean = true) {
  const green = /\*\*([^*]+)\*\*/g;
  const white = /\*([^*]+)\*/g;
  let content = reactStringReplace(text, green, (match, i) => (
    <span key={i} className={styles.green}>
      {match}
    </span>
  ));
  content = reactStringReplace(content, white, (match, i) => (
    <span key={i} className={styles.white}>
      {match}
    </span>
  ));
  return <span className={greyBase ? styles.grey : undefined}>{content}</span>;
}
