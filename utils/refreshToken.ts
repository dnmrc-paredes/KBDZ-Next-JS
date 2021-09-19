import axios from 'axios'

// Types
type FirebaseTokens = {
    access_token: string
    expires_in: string
    token_type: string
    refresh_token: string
    id_token: string
    user_id: string
    project_id: string
}

export const refreshToken = async (IDtoken: string) => {

    const { data } = await axios.post<FirebaseTokens>(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_ID}`,
        `grant_type=refresh_token&refresh_token=${IDtoken}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )

    console.log(data.user_id)
        
    return data.id_token

}