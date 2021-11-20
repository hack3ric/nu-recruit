import type { NextPage } from "next";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const idRegex = /^\d{13}$/;

const Query: NextPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [id, setId] = useState("");
  const [idError, setIdError] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  function handleSearch() {
    if (!idRegex.test(id)) {
      setIdError(true);
      enqueueSnackbar("学号格式不正确。", { variant: "error" });
      return;
    }
    let rows = JSON.parse(localStorage.getItem("id-" + id) || "[]");
    setRows(rows);
    enqueueSnackbar(`查询到 ${rows.length} 条结果。`, { variant: "success" });
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: 2 }}>
      <Typography variant="h6" marginBottom={3}>表单查询</Typography>
      <Box display="flex" marginBottom={3}>
        <TextField
          label="学号"
          sx={{ flexGrow: 1, marginRight: 2 }}
          value={id}
          onChange={e => { setId(e.target.value); setIdError(false); closeSnackbar() }}
          error={idError}
        />
        <Button variant="contained" size="large" onClick={handleSearch}>查询</Button>
      </Box>

      <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>学号</TableCell>
            <TableCell align="right">姓名</TableCell>
            <TableCell align="right">邮箱</TableCell>
            <TableCell align="right">报名方向</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            let orientationText;
            switch (row.orientation) {
              case "frontend": orientationText = "前端"; break;
              case "backend": orientationText = "后端"; break;
              case "sysadmin": orientationText = "系统管理员"; break;
              default: orientationText = row.orientation;
            }
            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{orientationText}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default Query;
