import { Box, Button, TextField } from "@mui/material";
import { BASE_URL } from "../config";
import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
// import { userState } from "../store/user";
export default function Signup() {
  //   const setUserState = useSetRecoilState(userState);
  const handleClick = async () => {
    console.log(username, gmail, password);

    const res = await axios.post(
      `${BASE_URL}/api/user/signup`,
      {
        username,
        gmail,
        password,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = res.data;
    console.log(data);

    if (data.message == true) {
      localStorage.setItem("Token", data.token);
      console.log("user signup done");

      //   if (localStorage.getItem("Token")) setUserState(true);
    } else {
      console.log("error in signup");
    }
  };
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

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
          label="Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Gmail"
          onChange={(e) => {
            setGmail(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
          variant="contained"
          onClick={handleClick}
        >
          Signup
        </Button>
      </Box>
    </div>
  );
}
