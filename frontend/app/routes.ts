import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("home", "routes/home.tsx"),
  route("add", "routes/add.tsx"),
  route("update/:taskId", "routes/update.tsx"),
  route("signup", "routes/signup.tsx"),
  route("task/:taskId", "routes/details.tsx"),
  route("forgot-password","routes/password.tsx"),
  route("profile","routes/profile.tsx")
]