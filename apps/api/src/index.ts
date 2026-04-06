import config from "./config.js";
import "./app.js";
import app from "./app.js";

// Server instance Initialiser
(async () => {
  try {
    app.listen({ port: config.PORT, host: "0.0.0.0" });
  } catch (error) {
    console.error("Server Starting failed :", error);
  }
})();
