import crypto from "crypto";

export function generateKey(data = null) {
  // Step 1: Create a random 16-byte buffer
  const randomBytes = crypto.randomBytes(10);

  // Step 2: If encoding data, combine it with the random bytes
  const payload = data ? Buffer.from(JSON.stringify(data)) : Buffer.alloc(0);
  const combinedBuffer = Buffer.concat([randomBytes, payload]);

  // Step 3: Encode the combined buffer in Base64 and make it URL-safe
  const urlSafeKey = combinedBuffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // Remove padding

    console.log('urlsafekey ' + urlSafeKey);
    const safeKey = encodeURIComponent(urlSafeKey);
console.log('safekey ' + safeKey);

  return urlSafeKey;
}

function decodeKey(key) {
  // Step 1: Make Base64-compatible by reversing URL-safe modifications
  const base64Key = key.replace(/-/g, "+").replace(/_/g, "/");

  // Step 2: Decode from Base64
  const decodedBuffer = Buffer.from(base64Key, "base64");

  // Step 3: Split random and payload parts if necessary
  const randomBytes = decodedBuffer.slice(0, 10); // First 16 bytes
  const payload = decodedBuffer.slice(10); // Remaining bytes
  const decodedData = payload.length ? JSON.parse(payload.toString()) : null;

  return { randomBytes, decodedData };
}

// Example Usage
// const key = generateKey({ documentId: "12345", timestamp: Date.now() });
// console.log("Generated Key:", key);

// const decoded = decodeKey(key);
// console.log("Decoded Key:", decoded);
