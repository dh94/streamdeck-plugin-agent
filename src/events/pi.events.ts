export enum IncomingPropertyInspectorEvents {
  // Event received after calling the getSettings API to retrieve the persistent data stored for the action.
  didReceiveSettings = "didReceiveSettings",

  // Event received after calling the getGlobalSettings API to retrieve the global persistent data.
  didReceiveGlobalSettings = "didReceiveGlobalSettings",

  // Event received by the Property Inspector when the plugin uses the sendToPropertyInspector event.
  sendToPropertyInspector = "sendToPropertyInspector"
}

export enum OutgoingPropertyInspectorEvents {
  //Save data persistently for the action's instance.
  setSettings = "setSettings",

  //Request the persistent data for the action's instance.
  getSettings = "getSettings",

  //Save data securely and globally for the plugin.
  setGlobalSettings = "setGlobalSettings",

  //Request the global persistent data.
  getGlobalSettings = "getGlobalSettings",

  //Open an URL in the default browser.
  openUrl = "openUrl",

  // Write a debug log to the logs file.
  logMessage = "logMessage",

  // Send a payload to the plugin.
  sendToPlugin = "sendToPlugin"
}
