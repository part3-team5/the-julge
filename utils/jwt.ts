import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  exp?: number;
  iat?: number;
}

// 토큰 유무 체크
function getTokenFromLocalStorage(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

// 디코딩, 디코딩된 토큰 저장하는 함수
function decodeToken(): DecodedToken | null {
  const token = getTokenFromLocalStorage();
  if (token) {
    try {
      const decoded = jwt.decode(token) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
  return null;
}

// 로컬스토리지에 있는 토큰 디코딩해서 id받아오기
export function getUserId(): string | null {
  const decodedToken = decodeToken();
  if (decodedToken) {
    return decodedToken.userId;
  }
  return null;
}
