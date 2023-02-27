export const getLocalStorageItem = (key: string) => {
  const data = typeof window !== "undefined" ? localStorage.getItem(key) : ""

  try {
    if (data) {
      return JSON.parse(data)
    }
  } catch (err) {
    return data
  }
}

export const setLocalStorageItem = (key: string, value: string) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value
  return localStorage.setItem(key, stringify)
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}

export const getUserIdFromLocalStorage = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("ceatec") : ""
  if (token) {
    const payload = token.split('.')[1]
    const jsonPayload = JSON.parse(window.atob(payload))
    return jsonPayload.sub._id.$oid
  }
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("ceatec") || ""
}