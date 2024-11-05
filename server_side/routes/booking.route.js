import express from "express";
import { Client } from "../models/booking.model.js";
const router = express.Router();

// Post Clients Details.......................

router.post("/client-details", async (req, res) => {
  try {
    const clientDetail = new Client(req.body);
    await clientDetail.save();
    res.status(201).json(clientDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Client's Details.......................

router.get("/client-details", async (req, res) => {
  try {
    const clientDetails = await Client.find().populate("user", "name email");
    res.status(200).json(clientDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Client's Details..................

router.get("/client-details/:id", async (req, res) => {
  try {
    const clientDetail = await Client.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!clientDetail) {
      return res.status(404).json({ error: "ClientDetail not found" });
    }
    res.status(200).json(clientDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client's Details.............................

router.put("/client-details/:id", async (req, res) => {
  try {
    const clientDetail = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!clientDetail) {
      return res.status(404).json({ error: "ClientDetail not found" });
    }
    res.status(200).json(clientDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Client's Details...........................

router.delete("/client-details/:id", async (req, res) => {
  try {
    const clientDetail = await Client.findByIdAndDelete(req.params.id);
    if (!clientDetail) {
      return res.status(404).json({ error: "ClientDetail not found" });
    }
    res.status(200).json({ message: "ClientDetail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
