import * as React from "react";
import List from "@mui/material/List";
import { default as ListItemContainer } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";

import { useEffect, useState } from "react";

export default function ReportsList() {
  const [reportsList, setReportsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState();

  useEffect(() => {
    async function fetchReportsData() {
      const reports = await fetch(
        "http://localhost:5113/reports/getReportsIds"
      );
      const reportsJson = await reports.json();
      setReportsList(reportsJson);
    }
    fetchReportsData();
  }, []);

  const openModalForReport = (reportId) => {
    setSelectedReport(reportId);
    toggleModal();
  };

  const toggleModal = () => setOpenModal(!openModal);

  return (
    reportsList && (
      <>
        <List sx={{ backgroundColor: "grey", width: "30vw" }}>
          {reportsList.map((report) => (
            <ListItemContainer
              secondaryAction={
                <IconButton
                  sx={{ marginRight: "5px" }}
                  edge="end"
                  aria-label="comments"
                  onClick={() => console.log("cliquei para editar")}
                >
                  <EditIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                sx={{
                  border: "solid 1px black",
                  margin: "10px",
                }}
                onClick={() => openModalForReport(report.id)}
              >
                <ListItemText primary={report.month} secondary={report.id} />
              </ListItemButton>
            </ListItemContainer>
          ))}
        </List>
        <Modal
          reportId={selectedReport}
          open={openModal}
          handleClose={toggleModal}
        />
      </>
    )
  );
}
