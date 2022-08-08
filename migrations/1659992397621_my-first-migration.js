require("dotenv").config();

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    email: { type: "varchar(64)", notNull: true },
    password: { type: "varchar(12)", notNull: true },
    fecha_registro: { type: "timestamp", notNull: true },
    is_admin: { type: "boolean", default: false, notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
