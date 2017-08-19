/* eslint-disable */
// Necessary to disable esLint for some stuff which would require too much code to fix (like last commas in objects)
<%
// List of props used in the template
var imports = props.imports
var Name = props.Name
var name = props.name
var actions = props.actions
var subsNames = props.subsNames
var states = props.states
%>
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import icon from 'Icons/faq-icon.png'

// Auto generated imports block
<% for (let importString of imports) { %><%- importString %>
<% } %>
class <%= Name %>Container extends Component {
  static navigationOptions = {
    tabBarLabel: '<%- Name %>',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={icon}
        style={[styles.icon, {tintColor}]}
        />
    ),
  }
  <% for (let action of actions) { %>
  <%- action.name %> ( <%- action.args.join(', ') %> ) {
     this.props.<%- action.name %>(<%- action.args.join(', ') %>)
  }
  <% } %><%#
  %><% for (let sub of subsNames) { %>
  toggle<%- sub.Name %>Modal = () => {
    this.setState({ show<%- sub.Name %>Modal: !this.state.show<%- sub.Name %>Modal })
  }
  <% } %>
  render () {
    return (
      <View style={styles.container}>
        <<%= Name %>Component
        props={this.props}
        <% for (let sub of subsNames) { %><%#
        %>toggle<%- sub.Name %>Modal={this.toggle<%- sub.Name %>Modal}<%#
        %><% } %>
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    <% for (let state of states) { %><%- state %>: false,
    <% } %>
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(<%- name %>Actions, dispatch), dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= Name %>Container)
