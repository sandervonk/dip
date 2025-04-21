"use client";

import React from "react";
import Image from "next/image";
import styles from "./Team.module.scss";
import { motion } from "motion/react";
import { Cursor } from "motion-plus/react";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  img: string;
  accomplishments: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Thomas Cherian",
    role: "Data Analysis & Strategy Lead",
    email: "tcherian@andrew.cmu.edu",
    img: "/dip/img/team/thomas.png",
    accomplishments: [
      "Analyzed survey data to define business needs and pitch direction.",
      "Contributed to research and writing for Deliverable 2 & 3.",
      "Participated in survey distribution, final pitch, and peer review.",
    ],
  },
  {
    name: "Isaiah Engle",
    role: "Content & Design Strategist",
    email: "iengle@andrew.cmu.edu",
    img: "/dip/img/team/isaiah.png",
    accomplishments: [
      "Developed initial website content structure, copy text, and pitch script elements.",
      "Integrated business feedback into script and ideation concepts.",
      "Contributed to Deliverable 3 (script aspects), final pitch, and peer review.",
    ],
  },
  {
    name: "Benjamin Najib",
    role: "Survey & Business Lead",
    email: "bnajibmo@andrew.cmu.edu",
    img: "/dip/img/team/benjamin.png",
    accomplishments: [
      "Designed survey questions for employees and business owners.",
      "Facilitated business owner outreach and subsequent writing.",
      "Participated in survey writing, final pitch, and peer review.",
    ],
  },
  {
    name: "Sander Vonk",
    role: "Lead Developer & Designer",
    email: "svonk@cmu.edu",
    img: "/dip/img/team/sander.png",
    accomplishments: [
      "Led website design from concept through implementation.",
      "Coded core website structure, hero section, and various elements.",
      "Incorporated business needs into final site design/code.",
      "Contributed to final website aspects, pitch practice, and peer review.",
    ],
  },
];

export default function TeamPage() {
  return (
    <main className={styles.pageContainer}>
      <Cursor
        style={{
          backgroundColor: "var(--cursor)",
        }}
      />
      <h1 className={styles.introHeader}>Meet the DIP Team</h1>
      <p className={styles.introText}>
        The students who proposed the <b>DIP</b> platform, combining skills in
        development, design, analysis, and business strategy to tackle workplace
        disconnection.
      </p>
      <div className={styles.teamListContainer}>
        {teamMembers.map((member, i) => (
          <motion.div
            className={styles.teamMemberCard}
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className={styles.teamMemberImageWrapper}>
              <Image
                src={member.img}
                alt={`Photo of ${member.name}`}
                fill
                className={styles.teamMemberImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <div className={styles.teamMemberInfo}>
              <h3>{member.name}</h3>
              <p>
                <b>Role:</b> {member.role}
              </p>
              <p>
                <b>Email:</b>{" "}
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </p>
              <ul>
                {member.accomplishments.map((accomplishment, index) => (
                  <li key={index}>{accomplishment}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
