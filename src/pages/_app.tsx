import "../styles/global.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { message } from "antd";
import { createContext } from "react";
import { MessageInstance } from "antd/es/message/interface";

export const MessagesContext = createContext<MessageInstance | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Provider store={store}>
      <MessagesContext.Provider value={messageApi}>
        {contextHolder}
        <Component {...pageProps} />
      </MessagesContext.Provider>
    </Provider>
  );
}
