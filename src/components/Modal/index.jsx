import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BasicModal({ reportId, open, handleClose }) {
  const [fullModalInfo, setFullModalInfo] = useState();
  useEffect(() => {
    async function fetchFullModalInfo() {
      const fmi = await fetch(
        `http://localhost:5113/reports/getReport/${reportId}`
      );
      const fmiJSON = await fmi.json();
      setFullModalInfo(fmiJSON);
    }
    fetchFullModalInfo();
  }, [reportId]);

  return (
    fullModalInfo && (
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            {fullModalInfo.length > 0
              ? fullModalInfo[0].transactionList?.map((transaction) => (
                  <div>{transaction.description}</div>
                ))
              : ""}
          </Box>
        </Modal>
      </div>
    )
  );
}
