const Admin = require("../models/Admin");

// @route   GET /api/admin/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// @route   PUT /api/admin/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      bio,
      github,
      linkedin,
      portfolio,
      image,
    } = req.body;

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = name ?? admin.name;
    admin.phone = phone ?? admin.phone;
    admin.location = location ?? admin.location;
    admin.bio = bio ?? admin.bio;
    admin.github = github ?? admin.github;
    admin.linkedin = linkedin ?? admin.linkedin;
    admin.portfolio = portfolio ?? admin.portfolio;
    admin.image = image ?? admin.image;

    await admin.save();

    res.status(200).json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

module.exports = { getProfile, updateProfile };
