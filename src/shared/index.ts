// Protocol between server and client. Types only.

export type Snapshot = {
  tick: number;
};

export type ServerMsg = { type: 'snapshot'; data: Snapshot };
