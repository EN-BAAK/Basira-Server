import "./src/config/config";
import db from "./src/models"
console.log("LOGGED", process.env.DB_NAME)
db.sequelize?.sync().then(() => {
  console.log("Database initialized successfully")
}).catch(e => {
  console.log("Error: Database didn't initialized", e)
})