const path = require("path");
const PROTO_PATH = path.resolve(__dirname, "../proto/user.proto");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefination = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UserService = grpc.loadPackageDefinition(packageDefination).UserService;
const client = new UserService("localhost:30043", grpc.credentials.createInsecure());

module.exports = client;
