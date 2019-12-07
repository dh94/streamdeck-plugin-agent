import {
  IncomingPluginEvents,
  OutgoingPluginEvents
} from "./events/plugin.events";
import {
  IncomingPropertyInspectorEvents,
  OutgoingPropertyInspectorEvents
} from "./events/pi.events";

export enum Mode {
  Plugin = "Plugin",
  PropertyInspector = "PropertyInspector"
}

type IncomingEventsKeys =
  | keyof typeof IncomingPluginEvents
  | keyof typeof IncomingPropertyInspectorEvents;

type OutgoingEventsKeys =
  | keyof typeof OutgoingPluginEvents
  | keyof typeof OutgoingPropertyInspectorEvents;

export interface StreamDeckIncomingEvent {
  event: IncomingEventsKeys;
  action?: string;
  context: string;
  payload: any;
}

export interface StreamDeckOutgoingEvent {
  event: OutgoingEventsKeys;
  action?: string;
  context?: string;
  payload?: any;
}

export type IncomingEventHandlers = {
  [key in IncomingEventsKeys]?: (event: StreamDeckIncomingEvent) => void;
};

export interface AgentOptions {
  onPluginStarted?: () => void;
}

export class StreamDeckAgent {
  public uuid!: string;
  public actionInfo: any;
  private port!: string;
  private registerEventName!: string;
  private inInfo: any;
  private websocket!: WebSocket;
  private incomingEventsHandlers!: IncomingEventHandlers;

  public constructor(
    mode: Mode,
    customHandlers: IncomingEventHandlers,
    private options?: AgentOptions
  ) {
    this.initHandlers(mode, customHandlers);
  }

  public instrument() {
    if ((process as any).browser) {
      (window as any).connectElgatoStreamDeckSocket = this.onPluginStart.bind(
        this
      );
    }
  }

  public dispatchEvent(event: StreamDeckOutgoingEvent) {
    this.websocket.send(JSON.stringify(event));
  }

  private initHandlers(mode: Mode, customHandlers: IncomingEventHandlers) {
    const incomingEventsOfMode =
      mode === Mode.Plugin
        ? IncomingPluginEvents
        : IncomingPropertyInspectorEvents;

    this.incomingEventsHandlers = {};
    Object.keys(customHandlers).forEach(customKey => {
      if (customKey in incomingEventsOfMode) {
        this.incomingEventsHandlers[customKey] = customHandlers[customKey];
      } else {
        console.error(
          `eventHandler "${customKey}" not allowed in mode ${mode}`
        );
      }
    });
  }

  /**
   * Connect function that gets called when streamDeck attaches to our plugin/pi
   */
  private onPluginStart(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
    this.port = inPort;
    this.uuid = inUUID;
    this.registerEventName = inRegisterEvent;
    this.inInfo = JSON.parse(inInfo || "{}");
    this.actionInfo = JSON.parse(inActionInfo || "{}");

    this.websocket = new WebSocket("ws://127.0.0.1:" + this.port);

    this.websocket.onopen = this.onWebSocketOpen.bind(this);
    this.websocket.onmessage = this.onWebSocketMessage.bind(this);
  }

  private onWebSocketOpen() {
    this.websocket.send(
      JSON.stringify({
        event: this.registerEventName,
        uuid: this.uuid
      })
    );
    this.options?.onPluginStarted?.call(undefined);
  }

  private onWebSocketMessage(event: MessageEvent) {
    const message: any = JSON.parse(event.data);

    if (message.event in this.incomingEventsHandlers) {
      this.incomingEventsHandlers[message.event](message);
    } else {
      console.debug(`unhandled event ${message.event}`);
    }
  }
}
