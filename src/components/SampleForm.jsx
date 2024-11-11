import React, { useState } from "react";
import authService from "../appwrite/auth"; // Your AuthService
import dbService from "../appwrite/config"; // Your DbService

const SampleSubmit = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sampleImageUrl = "https://via.placeholder.com/150"; // Replace with a valid image URL

    const handleLogin = async () => {
        try {
            await authService.login({ email, password });
            setIsLoggedIn(true);
            // console.log("Logged in successfully!");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const uploadSampleImage = async () => {
        try {
            const response = await fetch(sampleImageUrl);
            const blob = await response.blob();
            const file = new File([blob], "sample-image.png", { type: blob.type });

            const uploadResponse = await dbService.uploadFile(file);
            // console.log("Image uploaded successfully:", uploadResponse);
            return uploadResponse; // Return the response to use later
        } catch (error) {
            console.error("Failed to upload image:", error);
        }
    };

    const submitData = async () => {
        try {
            const imageResponse = await uploadSampleImage(); // Upload the image first
            const imageId = imageResponse ? imageResponse.$id : ""; // Get the image ID

            const response = await dbService.createPost({
                title: "Sample Title",
                slug: "sample-title",
                content: "This is a sample content.",
                featuredImg: imageId, // Use the uploaded image ID
                status: "active",
                userId: "your_user_id", // Replace with actual user ID
            });
            // console.log("Data submitted successfully:", response);
        } catch (error) {
            console.error("Failed to submit data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            setIsLoggedIn(false);
            // console.log("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                    <button onClick={submitData}>Submit Data with Sample Image</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default SampleSubmit;
