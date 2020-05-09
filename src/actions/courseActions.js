import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

// Action creator
export function saveCourse(course) {
  // É uma boa prática retornar a promise gerada para notificar quem chamou quando a promise for resolvida
  // pode ser usado para implementar uma tela de carregamento por exemplo
  // "Hey dispatcher, avise aos stores que um curso foi criado!"
  return courseApi.saveCourse(course).then(savedCourse => {
    dispatcher.dispatch({
      // Action
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
