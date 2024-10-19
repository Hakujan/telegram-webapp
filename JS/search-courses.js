function filterCourses() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const courses = document.getElementsByClassName("course-item");

  for (let i = 0; i < courses.length; i++) {
    const courseName = courses[i].getElementsByTagName("h2")[0].textContent;
    if (courseName.toLowerCase().indexOf(filter) > -1) {
      courses[i].style.display = "";
    } else {
      courses[i].style.display = "none";
    }
  }
}
