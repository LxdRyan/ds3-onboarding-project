import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("add", "routes/add.tsx"),
  route("profile", "routes/profile.tsx"),
  route("update/:taskId", "routes/update.tsx"),
  route("signup", "routes/signup.tsx"),
  route("task/:taskId", "routes/details.tsx"),
]