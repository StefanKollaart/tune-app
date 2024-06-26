// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { parseFile } from 'music-metadata';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const apiHandler = {
  fetchMetadata: async (filePath: string) => {
    try {
      const metadata = await parseFile(filePath);
      const { common, format } = metadata;
      const picture =
        common.picture && common.picture.length > 0
          ? common.picture[0]
          : undefined;
      const artwork = picture
        ? `data:${picture.format};base64,${picture.data.toString('base64')}`
        : undefined;

      return {
        title: common.title,
        artist: common.artist,
        filePath,
        duration: format.duration,
        artwork,
      };
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('API', apiHandler);

export type ElectronHandler = typeof electronHandler;
