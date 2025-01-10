import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BASE_URL } from "../config";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
export default function viewAllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/admin/viewAllCourses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
        console.log(res.data.courses);
      })
      .catch((err) => console.log("err"));
  }, []);
  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ maxWidth: 345, height: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                  image={course.imageLink}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    {course.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link href={"/addCourse"}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "black",
            color: "white",
            marginLeft: "15px",
          }}
        >
          Add Course
        </Button>
      </Link>
    </div>
  );
}
