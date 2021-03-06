import type { NextPage } from 'next';
import { AppBar, Link, styled, TextField, Toolbar } from "@mui/material";
import { CssBaseline, Container, Box, Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const idRegex = /^\d{13}$/;
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

type Form = {
  name: string,
  id: string,
  email: string,
  orientation: "frontend" | "backend" | "sysadmin" | ""
}

const Home: NextPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<Form>({
    name: "",
    id: "",
    email: "",
    orientation: ""
  });

  const [formError, setFormError] = useState({
    name: false,
    id: false,
    email: false,
    orientation: false,
    file: false
  });

  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];
    setFile(file);
    setFormError({ ...formError, file: false });
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: false });
    closeSnackbar();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newFormError = { ...formError };
    if (form.name.length === 0) newFormError.name = true;
    if (!idRegex.test(form.id)) newFormError.id = true;
    if (!emailRegex.test(form.email)) newFormError.email = true;
    if (form.orientation.length === 0) newFormError.orientation = true;
    if (!file) {
      newFormError.file = true
    } else {
      let fileSegments = file.name.split(".");
      let extension = fileSegments[fileSegments.length - 1];
      if (!["md", "docx", "pdf", "doc"].includes(extension)) newFormError.file = true;
    }
    setFormError(newFormError);
    for (let [_, b] of Object.entries(newFormError)) {
      if (b) {
        enqueueSnackbar("??????????????????????????????????????????", { variant: "error" });
        return;
      }
    }

    // for type check
    if (!file) return;

    let multipart = new FormData();
    multipart.append("basic", JSON.stringify(form));
    multipart.append("resume", file);

    const response = await fetch("/api/upload", { method: "POST", body: multipart });
    if (response.status === 200) {
      enqueueSnackbar("????????????", { variant: "success" });
      let apps: Form[] = JSON.parse(localStorage.getItem("id-" + form.id) || "[]");
      apps.push(form);
      localStorage.setItem("id-" + form.id, JSON.stringify(apps));
    } else {
      enqueueSnackbar("??????????????????", {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      });
    }
  }

  return <>
    <Container maxWidth="md" sx={{ paddingTop: 2 }}>
      <Typography variant="h6" marginBottom={2}>???????????? NetUnion</Typography>
      <Typography marginBottom={0}>NetUnion ?????????????????????????????????</Typography>
      <Typography fontSize="2px" marginBottom={2}>????????????????????? NU ????????????</Typography>
      <Typography marginBottom={3}>?????????????????????????????????????????????<Link href="/query">??????</Link>?????????</Typography>

      <form onSubmit={handleSubmit}>
        <Grid marginBottom={3} container alignItems="center" spacing={2}>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              name="name"
              label="??????"
              variant="outlined"
              value={form.name}
              error={formError.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              name="id"
              label="??????"
              variant="outlined"
              value={form.id}
              error={formError.id}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              name="email"
              label="??????"
              variant="outlined"
              value={form.email}
              error={formError.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth error={formError.orientation}>
              <InputLabel id="orientation">????????????</InputLabel>
              <Select
                labelId="orientation"
                name="orientation"
                label="????????????"
                value={form.orientation}
                onChange={handleInputChange}
              >
                <MenuItem value="frontend">??????</MenuItem>
                <MenuItem value="backend">??????</MenuItem>
                <MenuItem value="sysadmin">???????????????</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" marginBottom={3} alignItems="center">
          <Button component="label" variant="outlined" size="large" sx={{ flexShrink: 0 }} color={formError.file ? "error" : "primary"}>
            ????????????
            <input type="file" name="file" hidden onChange={handleFileChange} />
          </Button>
          <div style={{ width: 16, flexShrink: 0 }}></div>
          <Typography component="span" flexGrow={1} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color={formError.file ? "error" : "text"}>
            {formError.file ? "?????????????????????" : file?.name}
          </Typography>
          <div style={{ width: 16, flexShrink: 0 }}></div>
          <Button variant="contained" type="submit" size="large" sx={{ flexShrink: 0 }}>??????</Button>
        </Box>
      </form>
    </Container>
  </>;
};

export default Home;
