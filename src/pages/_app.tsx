import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Footer from "@divops/component-footer";
import { ReactNode } from "react";
import Head from "next/head";
import "../styles/index.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Getting Things Done</title>
      </Head>
      <Container>
        <Component {...pageProps} />
        <Footer />
      </Container>
    </QueryClientProvider>
  );
}

type Styled = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => JSX.Element;

const Container: Styled = ({ children }) => {
  return (
    <div
      css={{
        margin: "0 auto",
        width: "1200px",
      }}
      children={children}
    />
  );
};
