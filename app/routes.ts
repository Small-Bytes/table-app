import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("start-game", "./routes/start-game.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("table", "./routes/table.tsx"),
] satisfies RouteConfig;
