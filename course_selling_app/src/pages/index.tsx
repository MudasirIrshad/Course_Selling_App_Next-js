import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";

// Define types for course data
interface Course {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageLink: string;
}

export default function Home() {
  // Define state variables with their types
  const [buy, setBuy] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]); // Using the Course type
  const [alert, setAlert] = useState<boolean>(false);

  // Fetch courses on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/user/courses`)
      .then((res) => {
        setCourses(res.data.courses); // Assuming your response has `courses` array
      })
      .catch((err) => console.log("Error fetching courses:", err));
  }, []);

  // Handle course purchase
  async function handleClick(courseId: string) {
    if (!localStorage.getItem("Token")) {
      setAlert(true);
      setTimeout(() => setAlert(false), 4000); // Hide alert after 4 seconds
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/user/purchaseCourse/${courseId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      setBuy(true);
      setTimeout(() => setBuy(false), 4000); // Reset buy status after 4 seconds
      console.log("Purchase Response:", res.data);
    } catch (err) {
      console.log("Error purchasing course:", err);
    }
  }

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
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
                  <Button
                    onClick={() => handleClick(course._id)}
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Buy
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {alert && (
          <Alert style={{ margin: "20px" }} variant="outlined" severity="error">
            PLEASE SIGN IN OR LOGIN TO BUY THIS COURSE. THANK YOU
          </Alert>
        )}

        {buy && (
          <Alert
            style={{ margin: "20px" }}
            variant="outlined"
            severity="success"
          >
            Course Purchased. THANK YOU
          </Alert>
        )}
      </Grid>
    </div>
  );
}
