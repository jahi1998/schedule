import "./App.css";
import CourseList from "./components/CourseList";
import React, { useState, useEffect } from "react";
import { addScheduleTimes } from "./utilities/times";

const Banner = (props) => <h1>{props.title}</h1>;

const Scoreboard = () => {
  const [score, setScore] = useState(0);
};

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    };
    fetchSchedule();
  }, []);
  if (!schedule) return <h1>Loading schedule...</h1>;
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;
