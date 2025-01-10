import { Box, TextField, Button, Switch, Checkbox } from "@mui/material";
import { BASE_URL } from "../config";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<Number>(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);

  const handleClick = async () => {
    await axios
      .post(
        `${BASE_URL}/api/admin/addCourse`,
        {
          title,
          description,
          price,
          imageLink,
          published,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        router.push("/viewAllCourses");
      })
      .catch((err) => console.log("error in adding course"));
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px dashed grey",
          width: "400px",
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Price"
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="ImageLink"
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Published (True or False"
          onChange={(e) => {
            let res = e.target.value;
            if (res === "true") setPublished(true);
            else if (res === "false") setPublished(false);
          }}
        />

        <Button
          sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
