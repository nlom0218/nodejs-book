import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

// 생성한 모델 불러오기
import User from "./user";
import Post from "./post";
import Hashtag from "./hashtag";

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

// 각각 모델의 static.init 메서드 호출
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

// 다른 테이블과의 관계를 연결
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
