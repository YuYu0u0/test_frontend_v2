import { defineStore } from 'pinia'

export interface User {
  id?: number
  name: string
  age: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    setUsers(users: User[]) {
      this.users = users
    },
    addUser(user: User) {
      this.users.push(user)
    },
    updateUser(user: User) {
      const idx = this.users.findIndex(u => u.id === user.id)
      if (idx !== -1) this.users[idx] = user
    },
    removeUser(id: number) {
      this.users = this.users.filter(user => user.id !== id)
    },
  },
})
