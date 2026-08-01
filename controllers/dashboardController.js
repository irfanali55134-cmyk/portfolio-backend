const Contact = require("../models/Contact");
const Admin = require("../models/Admin");

// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayMessages = await Contact.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalAdmins = await Admin.countDocuments();

    res.status(200).json({
      totalMessages,
      todayMessages,
      totalAdmins,
      serverStatus: "Online",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching dashboard stats" });
  }
};

module.exports = { getStats };
