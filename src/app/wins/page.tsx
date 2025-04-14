"use client";

import { makePageStream } from "@/app/constants";

import WrappedTextHeader from "@/components/TextHeader";
import StatMany from "@/components/StatMany";

export default makePageStream([
  {
    component: WrappedTextHeader,
    data: {
      section: "WxC WINs",
      header: "Reducing Emissions with AWD in Bali",
      text: "The WINs from the Bali project will eliminate the release of tonnes of CO2e into the atmosphere by helping indigenous rice farmers adopt Alternate Wetting and Drying (AWD) irrigation. Our previous scientific work, using frontier emissions measurements, found that flooded Balinese rice fields produce **at least 30 tonnes more of CO2e/ha/year** than fields using AWD.",
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Get Involved",
      header: "How You Can Help",
      text: "Our goal for the Balinese Pilot Project is to **maximize the payments we pass on to the indigenous farmers** from the sale of carbon offset WINs. We will monitor, verify, and report (MVR) the adoption of AWD in the fields using our remote sensing system. The project is actively minimizing our infrastructure costs—we rely on a wonderful group of volunteers, driven by the ideals of the project to use quality science and technology to support the indigenous land stewards whose efforts improve the planet.",
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Support",
      header: "Become a Patron",
      text: "To embrace our ideals and participate in this project, please support us by **purchasing some WxC Bali Project carbon offsets!** Becoming a Patron is a meaningful way to improve the global commons, support indigenous agriculture (on Bali, rice fields are being replaced by resorts), and recognize your own impact on the planet.",
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Transparency",
      header: "Understanding the Carbon Offset Market",
      text: 'As you may have read in a few newspaper exposés, the carbon offset market has occasionally suffered corruption at various levels. Some offset promises have been **specious**, "certification" agencies can have incentives to generate revenue through high certification fees (accessible only to enterprises prioritizing profits), and some corporate offset claims have engaged in **greenwashing**. This has resulted in market prices for offsets ranging from **under $1 to over $100 per tonne**, depending on quality and other conditions.',
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Our Offering",
      header: "A Science-Driven Offset Price",
      text: "Given the **world-class science** driving our system and the **unprecedented MVR** tied to our carbon offsets, we are currently seeking a price of **$25 per tCO2e** offset as we begin the project. If you, your friends, or your organization would like to become Patrons or have questions, please connect with us.",
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Externalities",
      header: "Recognizing the True Cost of Our Actions",
      text: "There are activities in our lives that impose costs or benefits on others we often fail to recognize—economists call these **externalities**. For example, dropping litter affects everyone who passes by, yet no one is incentivized to clean it up. Releasing CO2e into the atmosphere is **littering at a global scale**. WxC enables individuals to recognize and take responsibility for these hidden impacts by purchasing offsets that directly support sustainable practices.",
    },
  },
  {
    component: WrappedTextHeader,
    data: {
      section: "Why It Matters",
      header: "Supporting Global Stewardship",
      text: "WxC makes it possible to fund farmers who **take on the added cost** of adopting better practices—like AWD—by passing on the payments from offset purchases. The idea is simple. The hard part, until WxC, was making it **feasible**. By recognizing and taking responsibility for the tradeoffs embodied by our actions, Patrons can make **informed choices** about how they live.",
    },
  },
  //To give a sense of CO2e impact:\n\n- **Average American**: 16–20 tCO2e/year  \n- **Average European**: ~8 tCO2e/year  \n- **Sustainable target (IPCC)**: 2 tCO2e/year  \n\nSome specific examples:\n\n- Driving a gasoline car 12,000 miles/year: **4.5 tCO2e**  \n- NYC to LA one-way in economy: **0.5 tCO2e** (double in business class)  \n- Switching to vegetarian diet: **1.5 tCO2e savings**  \n- Home energy (USA avg/person): Heating: **2.5 tCO2e**, Electricity: **3.8 tCO2e**  \n\nMake the choices that matter to you—just make them **informed choices**.
  {
    component: StatMany,
    data: {
      statsTitle: "Your Impact",
      stats: [
        {
          stat: {
            number: 16,
            after: " tCO2e",
          },
          text: "of CO2e is produced by the **average American** *every year*",
        },
        {
          stat: {
            number: 8,
            after: " tCO2e",
          },
          text: "of CO2e is produced by the **average European** *every year*",
        },
        {
          stat: {
            number: 2,
            after: " tCO2e",
          },
          text: "is the *sustainable target* of yearly C02e emissions for an individual (IPCC)",
        },
        {
          stat: {
            number: 4.5,
            after: " tCO2e",
          },
          text: "is produced by driving a gasoline car **12,000 miles/year**",
        },
        {
          stat: {
            number: 0.5,
            after: " tCO2e",
          },
          text: "is produced by a one-way flight from NYC to LA in economy class",
        },
        {
          stat: {
            number: 1.5,
            after: " tCO2e",
          },
          text: "is saved by switching to a vegetarian diet",
        },
        {
          stat: {
            number: 2.5,
            after: " tCO2e",
          },
          text: "is produced to heat a home **(USA avg/person)**",
        },
        {
          stat: {
            number: 3.8,
            after: " tCO2e",
          },
          text: "is produced by home electricity usage **(USA avg/person)**",
        },
      ],
    },
  },
]);
