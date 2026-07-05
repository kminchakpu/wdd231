import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from "./output.mjs";

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

document.querySelector("#enrollStudent").addEventListener("click", function () {
  const selectValue = document.querySelector("#sectionNumber").value;
  if (selectValue) {
    byuiCourse.changeEnrollment(Number(selectValue));
    renderSections(byuiCourse.sections);
  }
});
        
document.querySelector("#dropStudent").addEventListener("click", function () {
  const selectValue = document.querySelector("#sectionNumber").value;
  if (selectValue) {
    byuiCourse.changeEnrollment(Number(selectValue), false);
    renderSections(byuiCourse.sections);
  }
});