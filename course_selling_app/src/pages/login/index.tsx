import {
    Box,
    Button,
    Radio,
    RadioGroup,
    Switch,
    TextField,
  } from "@mui/material";
  import { BASE_URL } from "../config";
  import axios from "axios";
  import React, { useState } from "react";
  import { useSetRecoilState } from "recoil";
//   import { userState } from "../store/user";
import { useRouter } from "next/router";
  
  export default function index() {
    const [checked, setChecked] = useState(false);
    const [adminKey, setAdminKey] = useState("");
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = async () => {
      if (adminKey == "admin key") {
        const res = await axios.post(
          `${BASE_URL}/api/admin/login`,
          {
            adminname: username,
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
        if (data.message == "admin") {
          router.push("/");
          localStorage.setItem("Token", data.token);
          localStorage.setItem("message", data.message);
        }
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/user/login`,
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
  
        if (data.message == "user") {
          router.push("/");
          localStorage.setItem("Token", data.token);
          localStorage.setItem("message", data.message);
        }
      }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      console.log(checked);
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
  
          <div style={{ width: "350px", margin: "10px" }}>
            <p>Admin</p>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            {checked ? (
              <>
                <TextField
                  required
                  style={{ padding: "10px", width: "350px" }}
                  id="outlined-required"
                  label="Admin-Secret-Key"
                  onChange={(e) => {
                    setAdminKey(e.target.value);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <Button
            sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
            variant="contained"
            onClick={handleClick}
          >
            Login
          </Button>
        </Box>
      </div>
    );
  }