import "./App.css";
import CourseList from "./components/CourseList";
import React, { useState, useEffect } from "react";
import { addScheduleTimes } from "./utilities/times";
import { useData } from "./utilities/firebase";

const Banner = (props) => <h1>{props.title}</h1>;

const Scoreboard = () => {
  const [score, setScore] = useState(0);
};

const App = () => {
  const [schedule, loading, error] = useData("/", addScheduleTimes);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading schedule...</h1>;
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;
