import { LocalStorageService } from "@/service/localStorage.service.ts";
import { AppTheme } from "@/types/ui.ts";

export function getUserTheme(): AppTheme {
  return (
    LocalStorageService.get("theme") ||
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "Dark"
      : "Light")
  );
}
