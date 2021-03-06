/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var Name = props.Name
var actions = props.actions
var devUrl = props.devUrl
var prodUrl = props.prodUrl

function setDefaultHttpType(action) {
  if(action.name.match(/create/)) return 'post'
  if(action.name.match(/update/)) return 'put'
  if(action.name.match(/delete/)) return 'delete'
  if('type' in action) return action.type

  return 'get'
}
%>
/*
Auto generated file by AutoRnApp
You can override for each action: headers, args and http request type (get by default)
*/
import AppConfig from 'Config/AppConfig'
import apisauce from 'apisauce'

const env = process.env.NODE_ENV
const hostEnv = env === 'production' ? env : 'development'
const baseURL = AppConfig.hosts[hostEnv]
let defaultHeaders = {}

// Will try to find out default headers in the same file
const getDefaultHeaders = async () => {try {return await require('../defaultHeaders')()}catch(e){}}

const create<%- Name %>Api = () => {

  const api = apisauce.create({
    baseURL,
    timeout: 10000
  })

  return {
    <% for (let action of actions) {
    var defaultHttpType = setDefaultHttpType(action)
    %>
    <%- action.name %>: async function (args, additionalHeaders, httpType='<%- defaultHttpType %>') {
      let headers = await getDefaultHeaders()
      if(additionalHeaders && (typeof additionalHeaders === 'object')) {
        headers = {...defaultHeaders, ...additionalHeaders}
      }

      return api[httpType]('<%- action.name %>', args, {headers})
    },<% } %>
  }
}

export default create<%- Name %>Api()
