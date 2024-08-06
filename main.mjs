import { createServer } from "node:http";
import { readFile, stat } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the index.html file
const filePath = join(__dirname, "src", "index.html");

// Create the server
const server = createServer((req, res) => {
  // Handle requests for the root path
  if (req.url === "/") {
    readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    // Serve static files (like CSS)
    const fileUrl = join(__dirname, "src", req.url);
    stat(fileUrl, (err) => {
      if (err) {
        // If the file doesn't exist, send a 404 Not Found response
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      } else {
        // Read the requested file
        readFile(fileUrl, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            // Determine the content type based on the file extension
            const ext = extname(req.url);
            let contentType = "text/plain";
            switch (ext) {
              case ".css":
                contentType = "text/css";
                break;
              case ".js":
                contentType = "application/javascript";
                break;
              case ".png":
                contentType = "image/png";
                break;
              case ".jpg":
                contentType = "image/jpeg";
                break;
              case ".gif":
                contentType = "image/gif";
                break;
              case ".svg":
                contentType = "image/svg+xml";
                break;
              case ".html":
                contentType = "text/html";
                break;
            }
            // Send the file contents with a 200 OK status
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
          }
        });
      }
    });
  }
});

// Start the server on port 5300
server.listen(5300, () => {
  console.log("Server is running on http://localhost:5300");
});
