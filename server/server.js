const PROTO_PATH = "../proto/user.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefination = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefination);

const server = new grpc.Server();

const users = [
  {
    name: "name1",
    email: "name1@email.com",
    age: 18,
  },
  {
    name: "name2",
    email: "name2@email.com",
    age: 19,
  },
  {
    name: "name3",
    email: "name3@email.com",
    age: 20,
  },
];

server.addService(usersProto.UserService.service, {
  getUsers: (_, callback) => {
    callback(null, { users });
  },
  addUser: (call, callback) => {
    let user = call.request;

    users.push(user);
    callback(null, user);
  },
});

const PORT = 30043;
server.bindAsync(
  `127.0.0.1:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, result) => err && console.log(err)
);
console.log(`Server running at 127.0.0.1:${PORT}`);
