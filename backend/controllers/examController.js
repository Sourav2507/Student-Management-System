const Exam = require("../models/Exam");
const User = require("../models/User");
const Log = require("../models/Log"); // ⬅️ Add this line

// ✅ Get exams created by logged-in faculty
exports.getExams = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const exams = await Exam.find({ createdBy: facultyId }).lean();
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

// ✅ Create new exam
exports.createExam = async (req, res) => {
  try {
    const {
      title,
      subject,
      department,
      semester,
      date,
      duration,
      instructions,
      totalMarks,
      questions
    } = req.body;

    if (!title || !subject || !department || !semester || !date || !duration || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Missing required fields or questions" });
    }

    const newExam = new Exam({
      title,
      subject,
      department,
      semester,
      date,
      duration,
      instructions,
      totalMarks,
      questions,
      createdBy: req.user._id,
    });

    await newExam.save();

    // ✅ Fetch the faculty who created the exam
    const faculty = await User.findById(req.user._id).select("name");

    // ✅ Log the exam creation
    await Log.create({
      message: `New exam "${title}" created by ${faculty.name} (Faculty)`,
      category: "Exam",
      user: faculty._id,
    });

    res.status(201).json({ message: "Exam created successfully", exam: newExam });
  } catch (err) {
    console.error("❌ Error saving exam:", err);
    res.status(400).json({ error: "Failed to create exam" });
  }
};
