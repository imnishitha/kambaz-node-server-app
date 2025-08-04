
export default function ModuleObject(app) {
let moduleObject = {
    id: "M123",
    name: "Introduction to Web Development",
    description: "An overview of web technologies including HTML, CSS, JavaScript, and React.",
    course: "CS101",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    isPublished: true,
    lessons: [
      { id: "L101", title: "HTML Basics" },
      { id: "L102", title: "CSS Fundamentals" },
      { id: "L103", title: "JavaScript ES6" }
    ]
  };
  
 
  app.get("/lab5/module", (req, res) => {
    res.json(moduleObject); 
  });
  
  
  app.get("/lab5/module/name", (req, res) => {
    res.send(moduleObject.name); 
  });
}