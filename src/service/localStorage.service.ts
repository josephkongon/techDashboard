import localStore from "store";
import { UsersType } from "@/types/auth.ts";
import { AppTheme } from "@/types/ui.ts";

interface ILocalStorageItems {
  loginUser: string;
  userAuth: UsersType;
  theme: AppTheme;
}

export class LocalStorageService {
  static set<T extends keyof ILocalStorageItems>(
    key: T,
    value: ILocalStorageItems[T],
  ) {
    localStore.set(key, value);
  }

  static get<T extends keyof ILocalStorageItems>(
    key: T,
  ): ILocalStorageItems[T] | null {
    return localStore.get(key) || null;
  }

  static remove<T extends keyof ILocalStorageItems>(key: T) {
    localStore.remove(key);
  }

  static clear() {
    localStore.clearAll();
  }
}
