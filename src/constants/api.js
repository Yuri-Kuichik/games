const BASE_URL = 'https://poker.evenbetpoker.com/api/web/'

export const LOGIN_URL = `${BASE_URL}v2/login?clientId=default`
export const GAMES_URL = `${BASE_URL}v2/casino/games?clientId=default`
export const REFRESH_TOKEN_URL = `${BASE_URL}auth/token?clientId=default`
export const BALANCE_URL = `${BASE_URL}v2/users/me/balance?clientId=default&auth=`