import express from "express";
import Notification from "../models/Notification.js";
const router = express.Router();
// ---------------- GET Notifications for User ----------------
router.get("/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ recipientId: userId })
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    }
    catch (error) {
        next(error);
    }
});
// ---------------- MARK Notification as Read ----------------
router.patch("/:id/read", async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification) {
            res.status(404).json({ message: "Notification not found" });
            return;
        }
        res.status(200).json({ message: "Notification marked as read", notification });
    }
    catch (error) {
        next(error);
    }
});
// ---------------- CREATE Notification (Internal function) ----------------
export const createNotification = async (recipientId, recipientRole, type, message, relatedId) => {
    try {
        const notification = new Notification({
            recipientId,
            recipientRole,
            type,
            message,
            relatedId
        });
        await notification.save();
        return notification;
    }
    catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};
// ---------------- CREATE Notification for All Admins ----------------
export const createNotificationForAdmins = async (type, message, relatedId) => {
    try {
        const Admin = (await import("../models/Admin.js")).default;
        const admins = await Admin.find({});
        const notifications = [];
        for (const admin of admins) {
            const notification = new Notification({
                recipientId: admin._id,
                recipientRole: 'admin',
                type,
                message,
                relatedId
            });
            await notification.save();
            notifications.push(notification);
        }
        return notifications;
    }
    catch (error) {
        console.error("Error creating admin notifications:", error);
        throw error;
    }
};
// ---------------- DELETE Notification ----------------
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            res.status(404).json({ message: "Notification not found" });
            return;
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
export default router;
