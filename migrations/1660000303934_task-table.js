require("dotenv").config();

exports.up = (pgm) => {
  pgm.createTable("tasks", {
    id: { type: "serial", primaryKey: true },
    user_id: {
      type: "serial",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    task_name: { type: "varchar(64)", notNull: true },
    due_date: { type: "timestamp" },
    task_percentage: { type: "integer" },
    status: { type: "integer" },
    priority: { type: "integer" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
};
