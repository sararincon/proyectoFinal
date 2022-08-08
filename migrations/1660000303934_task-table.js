require("dotenv").config();

exports.up = (pgm) => {
  pgm.createTable("tasks", {
    id: { type: "serial", primaryKey: true },
    user_id: {
      type: "serial",
      notNull: true,
      references: "users(id)",
    },
    task_name: { type: "varchar(64)", notNull: true },
    due_date: { type: "timestamp", notNull: true },
    task_percentage: { type: "integer", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
};
