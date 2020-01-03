import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/Users/Userinfo',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/Users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/Users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/Users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/Users/Login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/Users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/Users/register',
    method: 'post',
    data
  })
