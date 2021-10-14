import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { GetStaticProps } from "next";
import React from "react";
import { FaqModel } from "../api/Faq";
import { openDB } from "../database/openDB";

interface Props {
  faq: FaqModel[];
}

const faq: React.FC<Props> = ({ faq }) => {
  return (
    <div>
      {faq.map((f) => (
        <Accordion key={f.id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{f.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{f.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const db = await openDB();
  const faq = await db.all(`SELECT * FROM FAQ ORDER BY createDate DESC`);
  return {
    props: { faq },
  };
};

export default faq;
