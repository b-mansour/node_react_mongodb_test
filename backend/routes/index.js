const userRouter = require("./userRouter");
const listItemRouter = require("./listItemRouter");
const categoryRouter = require("./categoryRouter");

const routes = {};

routes.userRouter = userRouter;
routes.listItemRouter = listItemRouter;
routes.categoryRouter = categoryRouter;

module.exports = routes;
