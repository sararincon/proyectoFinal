require("dotenv").config();

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    lastname: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(64)", unique: true, notNull: true },
    password: { type: "varchar(60)", notNull: true },
    foto: { type: "varchar(100)" },
    registration_date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    is_admin: { type: "boolean", default: false, notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
