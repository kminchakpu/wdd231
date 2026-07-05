const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development II",
  sections: [
    { sectionNum: 1, enrolled: 88, instructor: "Brother Bingham" },
    { sectionNum: 2, enrolled: 81, instructor: "Sister Shultz" },
    { sectionNum: 3, enrolled: 95, instructor: "Sister Smith" },
    { sectionNum: 4, enrolled: 100, instructor: "Brother Cheney" }
  ],
  changeEnrollment: function (sectionNum, enroll = true) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );
    if (sectionIndex >= 0) {
      if (enroll) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
    }
  }
};

export default byuiCourse;