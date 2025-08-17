import Creatives from "../models/Creatives.js";

// ➕ Create new creatives with file upload
export const createCreatives = async (req, res) => {
  try {
    const { files } = req;
    const newCreative = new Creatives({
      image1: files.image1 ? files.image1[0].path : null,
      image2: files.image2 ? files.image2[0].path : null,
      image3: files.image3 ? files.image3[0].path : null,
    });

    await newCreative.save();
    res.status(201).json(newCreative);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📂 Get all creatives
export const getCreatives = async (req, res) => {
  try {
    const creatives = await Creatives.find();
    res.status(200).json(creatives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📂 Get one creative
export const getCreativeById = async (req, res) => {
  try {
    const creative = await Creatives.findById(req.params.id);
    if (!creative) return res.status(404).json({ msg: "Creative not found" });
    res.status(200).json(creative);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update creatives (with files)
export const updateCreative = async (req, res) => {
  try {
    const { files, body } = req;
    const updatedData = {
      ...body,
      image1: files.image1 ? files.image1[0].path : body.image1,
      image2: files.image2 ? files.image2[0].path : body.image2,
      image3: files.image3 ? files.image3[0].path : body.image3,
    };

    const updatedCreative = await Creatives.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCreative) return res.status(404).json({ msg: "Creative not found" });
    res.status(200).json(updatedCreative);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete creatives
export const deleteCreative = async (req, res) => {
  try {
    const deletedCreative = await Creatives.findByIdAndDelete(req.params.id);
    if (!deletedCreative) return res.status(404).json({ msg: "Creative not found" });
    res.status(200).json({ msg: "Creative deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
