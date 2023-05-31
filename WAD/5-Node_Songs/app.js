const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Song = require("./models");
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

const songs = [
  {
    Songname: "Song1",
    Film: "Film1",
    Music_director: "Director1",
    singer: "New Singer",
    actor: "Actor1",
    actress: "Actress1",
  },
  {
    Songname: "Song2",
    Film: "Film1",
    Music_director: "Director2",
    singer: "Singer1",
    actor: "Actor1",
    actress: "Actress2",
  },
  {
    Songname: "Song3",
    Film: "Film2",
    Music_director: "Director1",
    singer: "Singer1",
    actor: "Actor1",
    actress: "Actress2",
  },
];

// Song.insertMany(songs)
//   .then(() => {
//     console.log('Songs inserted successfully');
//   })
//   .catch((err) => {
//     console.log('Error inserting songs:', err);
// });

app.post("/addsongs", async (req, res) => {
  try {
    var song = new Song(req.body);

    // Save the song to the database
    await song.save();

    res.redirect("/songs");
  } catch (error) {
    console.error("Error adding song:", error);
    res.send("Error adding song");
  }
});

app.get("/songsByDirector/:director", (req, res) => {
  const { director } = req.params;

  Song.find({ Music_director: director })
    .then((songs) => {
      res.render("songs", { songs: songs, totalCount: songs.length });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving songs");
    });
});

app.get("/songsByDirectorAndSinger/:director/:singer", (req, res) => {
  const { director, singer } = req.params;

  Song.find({ Music_director: director, singer: singer })
    .then((songs) => {
      res.render("songs", { songs: songs, totalCount: songs.length });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving songs");
    });
});

app.get("/songsBySingerAndFilm/:singer/:film", (req, res) => {
  const { singer, film } = req.params;

  Song.find({ singer: singer, Film: film })
    .then((songs) => {
      res.render("songs", { songs: songs, totalCount: songs.length });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving songs");
    });
});

// app.get("/songsBySingerAndFilm/:singer/:film", (req, res) => {
//     const { singer, film } = req.params;

//     Song.find({ singer: singer, Film: film })
//       .then((songs) => {
//         res.render("songs", { songs: songs, totalCount: songs.length });
//       })
//       .catch((err) => {
//         res.status(500).send("Error retrieving songs");
//       });
//   });

app.get("/songs", (req, res) => {
  console.log(req.query);
  Song.find(req.query)
    .then((song) => {
      const totalCount = song.length;
      res.render("songs", { songs: song, totalCount: totalCount });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

// app.post("/updateSong/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { actor, actress } = req.body;
  
//       const song = await Song.findByIdAndUpdate(
//         id,
//         { $set: { actor: actor, actress: actress } },
//         { new: true }
//       );
  
//     //   if (!song) {
//     //     return res.status(404).send("Song not found");
//     //   }
//       console.log(song);
//       res.redirect("/songs");
//     } catch (err) {
//       res.status(500).send("Error updating song");
//     }
//   });

app.put("/updateSong/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { actor, actress } = req.body;
  
      const song = await Song.findByIdAndUpdate(
        id,
        { $set: { actor: actor, actress: actress } },
        { new: true }
      );
  
      if (!song) {
        return res.status(404).send("Song not found");
      }

      Song.find()
        .then((songs) => {
          res.render("songs", { songs: songs, totalCount: songs.length });
        })
        .catch((err) => {
          res.status(500).send("Error retrieving songs details");
        });

    } catch (err) {
      res.status(500).send("Error updating song");
    }
  });
  

app.post("/deleteSong/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the song by ID and delete it
    await Song.findByIdAndDelete(id);

    res.redirect("/songs");
  } catch (error) {
    console.error("Error deleting song:", error);
    res.send("Error deleting song");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
