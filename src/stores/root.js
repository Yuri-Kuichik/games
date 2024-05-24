import { defineStore } from 'pinia'
import axios from 'axios'
import {LOGIN_URL, GAMES_URL, REFRESH_TOKEN_URL, BALANCE_URL, GAME_LINK_URL} from '../constants'

const AUTH_TOKEN_KEY = 'auth__accessToken'
const AUTH_REFRESH_TOKEN_KEY = 'auth__refreshToken'

export const useRootStore = defineStore('root', {
  state: () => ({
    games: [],
    balance: {},
    loadingGames: false,
    loadingLogin: false
  }),
  actions: {
    async loginUser(data) {
      this.loadingLogin = true
      try {
        const response = await axios.post(LOGIN_URL, {
          clientId: "default", 
          login: data.userName.trim(),  
          password: data.password.trim()  
        })
        this.setTokens(response.data.data[0].attributes)
      } catch (error) {
        console.error(error);
        alert('Something went wrong. Try again')
      }
      this.loadingLogin = false
    },

    async logoutUser() {
      this.removeTokens()
      location.reload();
    },

    async refreshToken() {
      const currentRefreshToken = this.getAuthRefreshToken()

      if (!!currentRefreshToken) {
        try {
          const response = await axios.post(REFRESH_TOKEN_URL, {
            clientId: "default",
            refreshToken: currentRefreshToken
          })

          this.setTokens(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    },

    async getGames() {
      this.loadingGames = true
      try {
        const response = await axios.get(GAMES_URL)

        this.games = response.data?.data
      } catch(error) {
        console.log(error);

        if(error.response.status == 401) {
          await this.refreshToken()
          this.getGames()
        } 
      }
      this.loadingGames = false
    },

    async getBalance() {
      const accesToken = this.getAuthToken()

      if(!!accesToken) {
        try {
          const response = await axios.get(`${BALANCE_URL}${accesToken}`)
  
          this.balance = response.data?.data[0]?.attributes
        } catch(error) {
          console.log(error);
          if(error.response.status == 401) {
            this.refreshToken()
          }   
        }
      }
    },

    async getGameLink(id) {
      if(!!id) {
        try {
          const responce = await axios.post(`${GAME_LINK_URL.replace('{gameId}', id)}`, {
            clientId: "default", 
            gameId: id       
          })
        } catch(error) {
          console.log(error)
        }
      }

    },

    setAutoRefreshToken() {
      const self = this

      setInterval(function() {
        self.refreshToken()
      }, 800000);
    },

    setAutoRefreshBalance() {
      const self = this

      setInterval(function() {
        self.getBalance()
      }, 30000);
    },

    setTokens(data) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data['refresh-token'])
    },

    getAuthToken() {
      return localStorage.getItem(AUTH_TOKEN_KEY)
    },

    getAuthRefreshToken() {
      return localStorage.getItem(AUTH_REFRESH_TOKEN_KEY)
    },

    removeTokens() {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
    },
  }
})
