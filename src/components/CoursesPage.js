import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import {
  loadCourses,
  deleteCourse,
  getAuthors
} from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) loadCourses();
    if (authors.length === 0)
      getAuthors().then(authors => {
        setAuthors(authors);
      });
    return () => courseStore.removeChangeListener(onChange); // clean up on unmount
  }, [courses.length, authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
