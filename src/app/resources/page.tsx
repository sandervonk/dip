// /Users/sander/Documents/GitHub/dip/src/app/resources/page.tsx
"use client";

import { makePageStream } from "@/app/constants";

import WrappedTextHeader from "@/components/TextHeader";

export default makePageStream([
  // 1. Introduction to the Resources Page
  {
    component: WrappedTextHeader,
    data: {
      section: "Project Resources",
      header: "Documents, Data & References",
      text: "This page provides access to key documents, data sources, and references related to the **DIP (Let's Dip)** project. Explore our planning, research, and the data driving our solution.",
    },
  },

  // 2. Link to Business Plan
  {
    component: WrappedTextHeader,
    data: {
      section: "Core Document",
      header: "DIP Business Plan",
      text: "Our comprehensive business plan outlines the problem statement, proposed solution, market analysis, platform features, and strategic goals for the DIP platform.\n\n*   [**Download DIP Business Plan (PDF)**](/dip/docs/DIP_Business_Plan_Deliverable_2.pdf)\n\n    *This document corresponds to Deliverable 2 and includes details cited as [36-49] in the project summary.*",
      // PDF is placed in `/public/dip/docs/DIP_Business_Plan_Deliverable_2.pdf`
    },
  },

  // 3. Section for Other Relevant Resources/References
  {
    component: WrappedTextHeader,
    data: {
      section: "Further Reading",
      header: "Related Research & Articles",
      text: "Explore external resources and research that provide context for the challenges DIP addresses:\n\n*   [Article on Post-Pandemic Workplace Disconnection Trends] - *Link placeholder*\n*   [Study on the Impact of Social Connection on Productivity] - *Link placeholder*\n*   [Research on Employee Engagement and Retention] - *Link placeholder*\n*   [Resources on Hybrid Work Models and Team Building] - *Link placeholder*",
    },
  },

  // 4. Optional: Contact Info or Next Steps
  {
    component: WrappedTextHeader,
    data: {
      section: "Get Involved",
      header: "Learn More",
      text: "For further details or specific inquiries about our research and resources, please reach out to the DIP project team.",
    },
  },
]);
