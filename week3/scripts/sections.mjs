export function setSectionSelection(sections) {
  const sectionElement = document.querySelector("#sectionNumber");
  sectionElement.innerHTML = "";
  
  // Create default placeholder option matching the image
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "--";
  defaultOption.value = "";
  sectionElement.appendChild(defaultOption);

  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = section.sectionNum;
    sectionElement.appendChild(option);
  });
}