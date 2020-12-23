exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.superadminBoard = (req, res) => {
  res.status(200).send("SuperAdmin Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.adminBoard2 = (req, res) => {
  res.status(200).send("Admin2 Content.");
};
