import { asyncMap } from "@apollo/client/utilities";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { setAuthentication } from './src/reducers/AuthenticationReducer';
import Navigator from "./src/navigation/Navigator";

const httpLink =  new HttpLink({
  uri: 'http://10.0.0.169:4000/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await SecureStore.getItemAsync('AUTH');
  operation.setContext(({ headers }) => ({ headers: {
    authorization: token ? `Bearer ${token}` : "",
    ...headers
  }}));
  return forward(operation);
});

const authCheckLink = new ApolloLink((operation, forward) => {
  return asyncMap(forward(operation), async (response) => {
    let data = response.data;
    if (data[Object.keys(data)[0]].status === 401) {
      await SecureStore.deleteItemAsync('AUTH')
      store.dispatch(setAuthentication(false))
    }
    return response;
  });
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: from([
    authLink,
    authCheckLink,
    httpLink
  ]), 
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Navigator/>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
