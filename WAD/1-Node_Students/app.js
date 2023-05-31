const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models");
const dbConfig = require("./config");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to database", err);
    process.exit();
  });

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/addmarks", (req, res) => {
  var myData = new Student(req.body);
  myData
    .save()
    .then((item) => {
      console.log("item saved to database");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

//Display total count of documents and List all the documents in browser.
app.get("/getMarks", (req, res) => {
  console.log(req.query);
  Student.find(req.query)
    .then((student) => {
      const totalCount = student.length;
      res.render("table", { student: student , totalCount : totalCount});
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

// app.get("/getMarks", (req, res) => {
//   Student.find(req.query)
//     .then((students) => {
//       const totalCount = students.length;
//       res.render("table", { students: students, totalCount: totalCount });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.json({ message: "Error retrieving student data" });
//     });
// });





app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

//List the names of students who got more than 20 marks in DSBDA Subject in browser.
app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } }, { name: 1, _id: 0 })
    .then((students) => {
      const studentNames = students.map((student) => student.name);
      res.send(studentNames);
    })
    .catch((err) => {
      res.status(500).send("Error retrieving student data");
    });
});


//List the names who got less than 40 in both wad and cc in browser.
app.get("/wadccGreaterThan40", (req, res) => {
  Student.find({ wad_marks: { $gt: 40 }, cc_marks: { $gt: 40 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

//Update the marks of Specified students by 10.
app.post("/updateMarks/:id", (req, res) => {
  const { id } = req.params;
  Student.findByIdAndUpdate(
    id,
    { $inc: { wad_marks: 10, cc_marks: 10, dsbda_marks: 10, cns_marks: 10, ai_marks: 10 } },
    { new: true }
  )
    .then((student) => {
      if (!student) {
        return res.status(404).send("Student not found");
      }
      console.log(student);
      // res.render("table", { student: student });
      console.log("Item data incremented and saved to database");
      
      // Retrieve the updated student marks
      Student.find({ _id: id })
        .then((updatedStudent) => {
          res.render("table", { student: updatedStudent });
        })
        .catch((err) => {
          res.status(500).send("Error retrieving updated student marks");
        });
    })
    .catch((err) => {
      res.status(500).send("Error updating student marks");
    });
});


//List the names who got more than 25 marks in all subjects in browser.
app.get("/allSubjectsGreaterThan25", (req, res) => {
  Student.find({
    wad_marks: { $gt: 25 },
    cc_marks: { $gt: 25 },
    dsbda_marks: { $gt: 25 },
    cns_marks: { $gt: 25 },
    ai_marks: { $gt: 25 },
  })
    .then((students) => {
      res.render("table", { student : students });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving student data");
    });
});

app.post("/deleteStudent/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((student) => {
    console.log("Deleted Successfully");
    res.redirect("/getMarks");
  });
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
