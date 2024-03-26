

const controller = {
  index: (req, res) => {
    res.send("Home");
    res.render('index', {title: "Espanol com Carol"});
  }
};

module.exports = controller;
