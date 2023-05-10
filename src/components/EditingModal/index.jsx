import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TransactionsTable from "./TransactionsTable";
import Button from "@mui/material/Button";

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

export default function EditingModal({ reportId, open, handleClose }) {
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

  const updateTransactionList = (transactionId, field, newValue) => {
    if (field == "value") {
      newValue = parseFloat(newValue.replace("R$", ""));
    }
    let tempFullModalInfo = fullModalInfo;
    tempFullModalInfo.transactionList.find((t) => t.id == transactionId)[
      field
    ] = newValue;
    setFullModalInfo(tempFullModalInfo);
  };

  const postNewTransactionList = async () => {
    await fetch(`http://localhost:5113/reports/editReport/${reportId}`, {
      method: "PUT",
      body: JSON.stringify(fullModalInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    fetchingFinished &&
    fullModalInfo && (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>
            {fullModalInfo.month + "/" + fullModalInfo.year}
          </Typography>
          <TransactionsTable
            transactionList={fullModalInfo.transactionList}
            updateCallback={updateTransactionList}
          />
          <Box
            sx={{
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": { backgroundColor: "white" },
              }}
              onClick={postNewTransactionList}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
}
