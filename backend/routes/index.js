const userRouter = require("./userRouter");
const listItemRouter = require("./eventRouter");

const routes = {};

routes.userRouter = userRouter;
routes.listItemRouter = listItemRouter;

module.exports = routes;
