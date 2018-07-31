import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ApolloModule, 
    HttpLinkModule
  ],
  declarations: []
})
export class GraphqlModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({uri: 'https://api.github.com/graphql' });

    const middleware = new ApolloLink((operation, forward) => {

      // Check for token
      const token = "a2c0ed0978922de320ab2962bcdea92fa9bced92";
      if (!token) return forward(operation);

      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        ),
      });
      return forward(operation);
    });

    const link = middleware.concat(http);

    apollo.create({
      link: link,
      cache: new InMemoryCache()
    });
  }
 
}
