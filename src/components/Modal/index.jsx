import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TransactionsTable from "./TransactionsTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "grey",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BasicModal({ reportId, open, handleClose }) {
  const [fullModalInfo, setFullModalInfo] = useState();
  const [fetchingFinished, setFetchingFinished] = useState(false);
  useEffect(() => {
    async function fetchFullModalInfo() {
      const fmi = await fetch(
        `http://localhost:5113/reports/getReport/${reportId}`
      );
      const fmiJSON = await fmi.json();
      setFullModalInfo(fmiJSON[0]);
    }
    setFetchingFinished(false);
    if (reportId) {
      fetchFullModalInfo();
      setFetchingFinished(true);
    }
  }, [reportId]);

  return (
    fetchingFinished &&
    fullModalInfo && (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>
            {fullModalInfo.month + "/" + fullModalInfo.year}
          </Typography>
          {console.log(fullModalInfo.transactionList)}
          <TransactionsTable transactionList={fullModalInfo.transactionList} />
        </Box>
      </Modal>
    )
  );
}
