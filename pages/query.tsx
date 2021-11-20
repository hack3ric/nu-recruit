import type { NextPage } from "next";
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const idRegex = /^\d{13}$/;

const Query: NextPage = () => {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  function handleSearch() {
    if (!idRegex.test(id)) {
      setIdError(true);
      return;
    }
    setRows(JSON.parse(localStorage.getItem("id-" + id) || "[]"));
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: 2 }}>
      <Typography variant="h2" marginBottom={3}>NetUnion 招新 - 表单查询</Typography>
      <Box display="flex" marginBottom={3}>
        <TextField label="学号" sx={{ flexGrow: 1, marginRight: 2 }} value={id} onChange={e => { setId(e.target.value); setIdError(false) }} />
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
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.orientation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default Query;
