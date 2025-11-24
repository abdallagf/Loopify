import { frostedThemePlugin } from "@whop/react/tailwind";

export default {
    content: [
        "./app/**/*.{ts,tsx,mdx}",
        "./components/**/*.{ts,tsx,mdx}",
    ],
    plugins: [frostedThemePlugin()]
};
