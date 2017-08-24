<%
var states = props.states
var Name = props.Name
var imports = props.imports
var subsNames = props.subsNames
var navs = props.navs
states = states.concat(props.name)
%>
import React, { Component } from 'react'
import { View, Text, Modal } from 'react-native'
import RoundedButton from 'Components/RoundedButton'
<% for (let importString of imports) { %><%- importString %>
<% } %>
export default class <%= Name %> extends Component {
  render () {
    const {
      <%- states.join(',\n\t\t\t') %>
    } = this.props.parentProps

    return (
      <View style={styles.container}>
        <Text><%= props.Name %> Component</Text>
        <% if (navs && navs.length > 0) {
        for (let nav of navs) { %>
          <RoundedButton/>
        <% }} %>
      </View>
    )
  }
}
