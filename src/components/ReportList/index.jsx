import * as React from "react";
import List from "@mui/material/List";
import { default as ListItemContainer } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";
import EditingModal from "../EditingModal";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function ReportsList() {
  const [reportsList, setReportsList] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditingModal, setOpenEditingModal] = useState(false);
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

  const openModalForReportView = (reportId) => {
    setSelectedReport(reportId);
    toggleViewModal();
  };

  const openModalForReportEditing = (reportId) => {
    setSelectedReport(reportId);
    toggleEditingModal();
  };

  const toggleViewModal = () => setOpenViewModal(!openViewModal);
  const toggleEditingModal = () => setOpenEditingModal(!openEditingModal);

  return (
    reportsList && (
      <Box
        sx={{
          margin: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List sx={{ backgroundColor: "grey", width: "30vw" }}>
          {reportsList.map((report) => (
            <ListItemContainer
              secondaryAction={
                <IconButton
                  sx={{ marginRight: "5px" }}
                  edge="end"
                  aria-label="comments"
                  onClick={() => openModalForReportEditing(report.id)}
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
                onClick={() => openModalForReportView(report.id)}
              >
                <ListItemText primary={report.month} secondary={report.id} />
              </ListItemButton>
            </ListItemContainer>
          ))}
        </List>
        <Modal
          reportId={selectedReport}
          open={openViewModal}
          handleClose={toggleViewModal}
        />

        <EditingModal
          reportId={selectedReport}
          open={openEditingModal}
          handleClose={toggleEditingModal}
        />
      </Box>
    )
  );
}
