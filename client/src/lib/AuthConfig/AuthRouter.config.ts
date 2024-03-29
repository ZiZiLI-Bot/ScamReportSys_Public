const publicRoutes = [
  "/",
  "/report",
  "/report/[id]",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const userRouters = ["/user/profile", "/report/new-report", "/user/reports", "/transaction-review/new-review"];

const isRouterMatch = (router: string, routers: string[]): boolean => {
  return routers.some((pattern) => {
    if (pattern.includes("[id]")) {
      const regex = new RegExp(`^${pattern.replace("[id]", "\\w+")}$`);
      return regex.test(router);
    } else {
      return router === pattern;
    }
  });
};

export { publicRoutes, userRouters, isRouterMatch };
