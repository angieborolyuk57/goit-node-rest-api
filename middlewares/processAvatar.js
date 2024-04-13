const Jimp = require("jimp")
const path = require("path")
const fs = require("fs")

const publicAvatarDir = path.resolve("public/avatars")
const tempImagePath = path.resolve("tmp")

async function processAvatar(req, res, next) {
  try {
    const image = await Jimp.read(tempImagePath) // Read the image

    const resizedImage = await image.resize(250, 250) // Resize the image

    // Generate a unique file name for the resized image
    const uniqueFileName = `${req.user._id}_${Date.now()}.jpg`

    const publicAvatarPath = path.join(publicAvatarDir, uniqueFileName) // Construct the file path

    await resizedImage.writeAsync(publicAvatarPath) // Save the resized image to file

    // Respond with success message
    res.status(200).json({ message: "Avatar processed successfully" })
  } catch (error) {
    // Handle errors
    console.error("Error processing avatar:", error)
    next(error)
  }
}

module.exports = {
  processAvatar,
}
