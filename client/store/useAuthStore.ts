import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import type { UserType } from "../types/models/user";
import type { LoginReq, LoginRes } from "../types/queries/LoginQuery";

const setExpirationTime = (second: number) => {
  localStorage.setItem(
    "expirationDateJWT",
    new Date(new Date().getTime() + second * 1000).toISOString(),
  );
};
const isExpiredToken = () => {
  const expirationDateJWT = new Date(
    localStorage.getItem("expirationDateJWT") as string,
  );
  return expirationDateJWT < new Date();
};

const setLastRefreshDate = () => {
  const today = new Date().toISOString().slice(0, 10); // Formato: "YYYY-MM-DD"
  localStorage.setItem("lastRefreshDate", today);
};

const canRefreshToken = () => {
  const lastRefreshDate = localStorage.getItem("lastRefreshDate");
  if (!lastRefreshDate) return true; // No hay fecha previa, puede refrescar

  const today = new Date().toISOString().slice(0, 10);
  return lastRefreshDate !== today;
};

export const useAuthStore = defineStore("auth", () => {
  // Declaring states for user store
  const token = ref<string>("");
  const user = ref<UserType | null>(null);
  const userRole = computed(() => user.value?.role);
  const rememberPassword = ref<boolean>(false);

  // Initial store w/app
  const userSaved = localStorage.getItem("user");
  const tokenSaved = localStorage.getItem("token");

  if (userSaved && tokenSaved) {
    user.value = JSON.parse(userSaved);
    token.value = tokenSaved;
    rememberPassword.value = true;
    refreshToken();
  }

  // Store watcher to update in localStorage when the store is updated
  watch(
    user,
    (userVal) => {
      if (rememberPassword.value) {
        localStorage.setItem("user", userVal ? JSON.stringify(userVal) : "");
        localStorage.setItem("token", token.value);
      }
    },
    { deep: true },
  );

  // Methods dependencies
  const router = useRouter();
  const config = useRuntimeConfig();

  // Methods
  async function login(req: LoginReq, savePassword: boolean) {
    const { data } = await axios
      .post<LoginRes>(config.public.API_URL + "/auth/login", req)
      .catch((err) => {
        throw new Error(err.response.data.error);
      });

    rememberPassword.value = savePassword;
    if (savePassword) {
      setExpirationTime(data.expires_in);
      setLastRefreshDate();
    }
    token.value = data.token;
    user.value = data.user;
    router.push("/");
  }

  function logout() {
    token.value = "";
    user.value = null;
    rememberPassword.value = false;
    router.push("/login");
  }

  async function refreshToken() {
    if (isExpiredToken()) return logout();
    if (!canRefreshToken()) return;

    const { data } = await axios.get<LoginRes>(
      config.public.API_URL + "/auth/refresh",
      { headers: { Authorization: token.value } },
    );

    token.value = data.token;
    localStorage.setItem("token", data.token);
    setExpirationTime(data.expires_in);
    setLastRefreshDate();
  }

  return { token, user, userRole, login, logout, setNewToken: refreshToken };
});
