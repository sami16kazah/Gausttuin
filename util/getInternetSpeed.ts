// utils/internetSpeed.ts

export async function getInternetSpeed(): Promise<number> {
    const testImage = "https://via.placeholder.com/100x100"; // Small 100x100 image
    const fileSizeInBits = 8000; // Approximate size of the image in bits (8kb)
  
    return new Promise((resolve) => {
      const startTime = Date.now();
  
      const img = new Image();
      img.onload = () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const speed = fileSizeInBits / duration; // Bits per second
        resolve(speed);
      };
      img.onerror = () => {
        resolve(1000000); // Default fallback speed in case of error
      };
      img.src = testImage + "?cache=" + Math.random(); // Prevent caching
    });
  }
  