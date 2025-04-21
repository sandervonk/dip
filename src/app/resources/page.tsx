// /Users/sander/Documents/GitHub/dip/src/app/resources/page.tsx
"use client";

import { makePageStream } from "@/app/constants";

import WrappedTextHeader from "@/components/TextHeader";

export default makePageStream(
  [
    // 1. Introduction to the Resources Page
    {
      component: WrappedTextHeader,
      data: {
        section: "Project Resources",
        header: "Documents, Data & References",
        text: "This page provides access to key documents, data sources, and references related to the **DIP** project. Explore our business planning, research, and the data driving our solution.",
      },
    },

    // 2. Link to Business Plan
    {
      component: WrappedTextHeader,
      data: {
        section: "Core Document",
        header: "DIP Business Plan",
        text: `Our comprehensive <a href="/dip/docs/business.pdf" target="_blank" rel="noopener noreferrer" download="Business Plan.pdf">**business plan**</a> outlines the problem statement, proposed solution, market analysis, platform features, and strategic goals for the DIP platform.`,
      },
    },

    // 3. Section for Other Relevant Resources/References
    {
      component: WrappedTextHeader,
      data: {
        section: "Further Reading",
        header: "Related Research & Articles",
        text: `Explore external resources and research that provide context for the challenges DIP addresses:
        <sources><ul>
          <li><a href="https://doi.org/10.1108/ccij-08-2022-0102" target="_blank">
            Imam, Hassan, et al. **“The Roles of Supervisor Support, Employee Engagement and Internal Communication in Performance: A Social Exchange Perspective.”** <i>Corporate Communications An International Journal</i>, vol. 28, no. 3, Nov. 2022, pp. 489–505, doi:10.1108/ccij-08-2022-0102.
          </a></li>
          <li><a href="https://doi.org/10.26668/businessreview/2023.v8i1.814" target="_blank">
            Achmad, Listian Indriyani, et al. **“Job Satisfaction and Employee Engagement as Mediators of the Relationship Between Talent Development and Intention to Stay in Generation Z Workers.”** <i>International Journal of Professional Business Review</i>, vol. 8, no. 1, Jan. 2023, pp. e0814–e0814, doi:10.26668/businessreview/2023.v8i1.814.

          </a></li>
          <li><a href="https://doi.org/10.1108/00197850610653171" target="_blank">
            Gerke, Susan K. **“If I Cannot See Them, How Can I Lead Them?”** <i>Industrial and Commercial Training</i>, vol. 38, no. 2, Feb. 2006, pp. 102–05, doi:10.1108/00197850610653171.

          </a></li>
          <li><a href="https://doi.org/10.61536/ambidextrous.v1i01.30" target="_blank">
            Asakdiyah, Salamatun, and Ajeng Andriani Hapsari. **“The Impact of Engagement-Based Leadership, HR Technology Adaptation, and Skill Development on Work Efficiency: Mediating Through Employee Well-Being.”** <i>Ambidextrous</i>, vol. 1, no. 01, Dec. 2023, pp. 25–34, doi:10.61536/ambidextrous.v1i01.30.
          </a></li>
          <li><a href="https://doi.org/10.47992/ijcsbe.2581.6942.0274" target="_blank">
            Monteiro, Elvira, and James Joseph. **“A Review on the Impact of Workplace Culture on Employee Mental Health and Well-Being.”** <i>International Journal of Case Studies in Business IT and Education</i>, June 2023, pp. 291–317, doi:10.47992/ijcsbe.2581.6942.0274.
          </a></li>
        </ul></sources>`,
      },
    },

    // 4. Optional: Contact Info or Next Steps
    {
      component: WrappedTextHeader,
      data: {
        section: "Get Involved",
        header: "Learn More",
        text: `For further details or specific inquiries about our research and resources, please reach out to the <a href="./team">**project team**</a>.`,
      },
    },
  ],
  {
    style: {
      marginBottom: "40dvh",
    },
  }
);
