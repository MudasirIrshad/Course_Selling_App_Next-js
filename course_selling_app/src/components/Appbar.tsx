import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Appbar() {
  const router = useRouter();
  const [usertoken, setUserToken] = useState(false);
  const [admintoken, setAdminToken] = useState(false);
  const handleClick = () => {
    setUserToken(false);
    setAdminToken(false);
    localStorage.clear();
    router.push("/");
  };
  useEffect(() => {
    if (localStorage.getItem("message") == "user") {
      setUserToken(true);
    }
  }, [usertoken]);
  useEffect(() => {
    if (localStorage.getItem("message") == "admin") {
      setAdminToken(true);
    }
  }, [usertoken]);
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "5px",
          }}
        >
          Home
        </Button>

        {admintoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              <Link href={"/addcourse"}>Courses</Link>
            </Button>
          </>
        ) : (
          <></>
        )}
        {usertoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              Courses
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {usertoken || admintoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
              onClick={handleClick}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              <Link href={"/login"}>Login</Link>
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <Link href={"/signup"}>Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
