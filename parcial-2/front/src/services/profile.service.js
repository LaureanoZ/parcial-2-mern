import API from "./api.service";

export async function getCurrent() {
    return API.call({ uri: 'profile' });
  }
  // export async function initProfile(profileData) {
  //   return API.call({ uri: 'profile', method: 'POST', body: profileData });
  // }
  export async function initProfile( body, token ) {
    return fetch(`http://localhost:2222/api/profile`, {
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(async response => {
            if (!response.ok) {

                if (response.status === 401) {
                    localStorage.removeItem('token')
                }

                throw await response.json()
            }
            return response.json()
        })
}
  
  export async function updateProfile(profileData , idProfile) {
    return API.call({ uri: `profile/${idProfile}`, method: 'PATCH', body: profileData });
  }
  
  export default {
    getCurrent,
    updateProfile,
    initProfile
  }