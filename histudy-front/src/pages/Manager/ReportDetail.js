import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { border, Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CustomTable from "../../components/common/CustomTable";
import LongButton from "../../components/common/LongButton";
import GrayBorderBox from "../../components/common/GrayBorderBox";
import ProgressBar from "../../components/common/ProgressBar";
import SideBar from "../../components/Manager/SideBar";
import YearSelectButton from "../../components/Manager/YearSelectButton";
import SemesterSelectButton from "../../components/Manager/SemesterSelectButton";
import RegisterClassButton from "../../components/Manager/RegisterClassButton";
import ManagerTable from "../../components/Manager/ManagerTable";
import GroupTable from "../../components/Manager/GroupTable";
import UnGroupTable from "../../components/Manager/UnGroupTable";
import { Image } from "@mui/icons-material";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { readReportDetail } from "../../apis/manager";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReport, modifyReport } from "../../apis/report";
import Snackbars from "./Snackbars";
import { useRecoilState } from "recoil";
import { isDelete, reportDeleteState } from "../../store/atom";

import { StyledColumnAlignLayout } from "../../components/common/StyledLayout";
import Title from "../../components/common/Title";
import { motion } from "framer-motion";

export default function ReportDetail() {
  const [reportData, setReportData] = useState();
  const [open, setOpen] = useRecoilState(isDelete);

  const { state } = useLocation();

  const useUserReportDeatilMatch = useMatch("/report/:id");

  useEffect(() => {
    if (useUserReportDeatilMatch) {
      setReportData(state);
    } else {
      readReportDetail(state).then((info) => {
        setReportData(info);
      });
    }
  }, []);

  console.log(state);

  const navigate = useNavigate();

  const moveToBefore = () => {
    navigate(-1);
  };

  const handleClick = async (buttonId) => {
    console.log(buttonId, "clicked");
    if (buttonId === "modify") {
      navigate(`/report/modify/${state.id}`, { state: state });
    } else if (buttonId === "delete") {
      // setOpen(true);

      if (useUserReportDeatilMatch) {
        if (window.confirm("정말 삭제하시겠습니까?")) {
          deleteReport(state.id).then(() => {
            alert("성공적으로 삭제되었습니다.");
            navigate(-1);
          });
        }
      } else {
        if (window.confirm("정말 삭제하시겠습니까?")) {
          deleteReport(state).then(() => {
            alert("성공적으로 삭제되었습니다.");
            navigate(-1);
          });
        }
      }
    }
  };

  return (
    <>
      {reportData && (
        <StyledColumnAlignLayout
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box sx={{ position: "fixed", left: "30px", top: "50px" }}>
            {!useUserReportDeatilMatch && <SideBar />}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: "20px",
              width: "100%",
            }}
          >
            <IconButton
              sx={{ position: "absolute", left: "0px", top: "0px" }}
              onClick={() => moveToBefore()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Title text={"보고서 상세 페이지"} />
            </Box>

            <Box
              sx={{
                border: 1,
                backgroundColor: "primary.default",
                borderColor: "primary.main",
                borderRadius: "30px",
                width: "100%",
                padding: "40px 40px",
              }}
            >
              <>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "40px",
                      mb: "1rem",
                      position: "relative",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "100px", color: "text.secondary" }}>
                      제목
                    </Box>
                    <Typography
                      sx={{
                        flex: "10 1 auto",
                        marginLeft: "10px",
                        minWidth: "150px",
                      }}
                    >
                      {reportData.title}
                    </Typography>
                    {useUserReportDeatilMatch && (
                      <IconButton onClick={() => handleClick("modify")}>
                        <DriveFileRenameOutlineIcon color="primary" />
                      </IconButton>
                    )}

                    <IconButton>
                      <DeleteIcon
                        onClick={() => handleClick("delete")}
                        color="error"
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "40px",
                      mb: "1rem",
                    }}
                  >
                    <Box sx={{ width: "100px", color: "text.secondary" }}>
                      참여 멤버
                    </Box>
                    <Typography sx={{ flex: "10 1 auto", marginLeft: "10px" }}>
                      {reportData?.participants?.map((member, index) => (
                        <Fragment key={index}>
                          {index > 0 && ", "}
                          {member.name}
                        </Fragment>
                      ))}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "40px",
                      mb: "1rem",
                    }}
                  >
                    <Box sx={{ width: "100px", color: "text.secondary" }}>
                      스터디 시간
                    </Box>
                    <Typography sx={{ flex: "10 1 auto", marginLeft: "10px" }}>
                      {reportData.totalMinutes}분
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "40px",
                      mb: "1rem",
                    }}
                  >
                    <Box sx={{ width: "100px", color: "text.secondary" }}>
                      보고서 내용
                    </Box>
                    <Typography sx={{ flex: "10 1 auto", marginLeft: "10px" }}>
                      {reportData.content}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100px", color: "text.secondary" }}>
                    인증 사진
                  </Box>
                  <Box
                    sx={{
                      display: "flex",

                      width: "100%",
                      my: "1rem",
                    }}
                  >
                    <ImageList>
                      {reportData.images?.map((item) => (
                        <ImageListItem key={item.id}>
                          <img src={item.url} alt="보고서 사진" />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Box>
              </>
            </Box>
          </Box>
        </StyledColumnAlignLayout>
      )}
    </>
  );
}
