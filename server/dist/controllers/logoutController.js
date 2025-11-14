const logoutController = async (req, res) => {
    try {
        // Optionally, implement token invalidation logic here
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export default logoutController;
