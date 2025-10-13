import axios from "axios";

const doNotRefresh = ["/auth/login"];

export const api = axios.create({
  baseURL: "/api",
});

let isRefreshing = false; // 토큰 갱신 중복 요청 방지 플래그
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // 새 토큰으로 요청 재시도
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      doNotRefresh.indexOf(originalRequest.url) === -1
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // 새 토큰을 받은 후, 원본 요청을 새 토큰으로 재시도
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 갱신 시작 (중복 방지 플래그 설정)
      originalRequest._retry = true; // 재시도 요청임을 표시
      isRefreshing = true;

      try {
        const response = await axios.post("/auth/refresh"); // 실제 리프레시 API 엔드포인트
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        isRefreshing = false;
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
