import DeliveryLocation from "../models/DeliveryLocation.js";

// Create location
export const createLocation = async (req, res) => {
  try {
    const location = new DeliveryLocation(req.body);
    const saved = await location.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all locations (with search)
export const getLocations = async (req, res) => {
  try {
    const search = req.query.search || "";
    const locations = await DeliveryLocation.find({
      $or: [
        { pincode: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getLocationById = async (req, res) => {
  try {
    const location = await DeliveryLocation.findById(req.params.id);
    if (!location) return res.status(404).json({ error: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update location
export const updateLocation = async (req, res) => {
  try {
    const updated = await DeliveryLocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Location not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete location
export const deleteLocation = async (req, res) => {
  try {
    const deleted = await DeliveryLocation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Location not found" });
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
