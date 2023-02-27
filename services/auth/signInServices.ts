import { ISignInUserData } from "../../interfaces/componentsInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const signInService = async (data: ISignInUserData) => {
  const response = await fetch(`${apiUrl}/auth/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const status = response.status
  const json = await response.json()
  return { json, status }
}
