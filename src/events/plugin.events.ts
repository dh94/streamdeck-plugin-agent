export enum IncomingPluginEvents {
  // Event received after calling the getSettings API to retrieve the persistent data stored for the action.
  didReceiveSettings = "didReceiveSettings",

  // Event received after calling the getGlobalSettings API to retrieve the global persistent data.
  didReceiveGlobalSettings = "didReceiveGlobalSettings",

  // When the user presses a key, the plugin will receive the keyDown event.
  keyDown = "keyDown",

  // When the user releases a key, the plugin will receive the keyUp event.
  keyUp = "keyUp",

  // When an instance of an action is displayed on the Stream Deck, for example when the hardware is first plugged in, or when a folder containing that action is entered, the plugin will receive a willAppear event.
  willAppear = "willAppear",

  // When an instance of an action ceases to be displayed on Stream Deck, for example when switching profiles or folders, the plugin will receive a willDisappear event.
  willDisappear = "willDisappear",

  // When the user changes the title or title parameters, the plugin will receive a titleParametersDidChange event.
  titleParametersDidChange = "titleParametersDidChange",

  // When a device is plugged to the computer, the plugin will receive a deviceDidConnect event.
  deviceDidConnect = "deviceDidConnect",

  // When a device is unplugged from the computer, the plugin will receive a deviceDidDisconnect event.
  deviceDidDisconnect = "deviceDidDisconnect",

  // When a monitored application is launched, the plugin will be notified and will receive the applicationDidLaunch event.
  applicationDidLaunch = "applicationDidLaunch",

  // When a monitored application is terminated, the plugin will be notified and will receive the applicationDidTerminate event.
  applicationDidTerminate = "applicationDidTerminate",

  // When the computer is wake up, the plugin will be notified and will receive the systemDidWakeUp event.
  systemDidWakeUp = "systemDidWakeUp",

  // Event received when the Property Inspector appears in the Stream Deck software user interface, for example when selecting a new instance.
  propertyInspectorDidAppear = "propertyInspectorDidAppear",

  // Event received when the Property Inspector for an instance is removed from the Stream Deck software user interface, for example when selecting a different instance.
  propertyInspectorDidDisappear = "propertyInspectorDidDisappear",

  // Event received by the plugin when the Property Inspector uses the sendToPlugin event.
  sendToPlugin = "sendToPlugin",

  // Event received by the Property Inspector when the plugin uses the sendToPropertyInspector event.
  sendToPropertyInspector = "sendToPropertyInspector"
}

export enum OutgoingPluginEvents {
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

  // Dynamically change the title of an instance of an action.
  setTitle = "setTitle",

  // Dynamically change the image displayed by an instance of an action.
  setImage = "setImage",

  // Temporarily show an alert icon on the image displayed by an instance of an action.
  showAlert = "showAlert",

  // Temporarily show an OK checkmark icon on the image displayed by an instance of an action.
  showOk = "showOk",

  // Change the state of the action's instance supporting multiple states.
  setState = "setState",

  // Switch to one of the preconfigured read-only profiles.
  switchToProfile = "switchToProfile",

  // Send a payload to the Property Inspector.
  sendToPropertyInspector = "sendToPropertyInspector"
}
