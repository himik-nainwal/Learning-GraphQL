import {ApolloServer,gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import {users , quotes} from "./dummyDB";
const typeDefs = gql`
   type Query{
       users:[User]
   }
   type User {
    id:ID
   }
`;

const resolvers = {
    Query:{
        greet:()=>{
            return "Hello world"
        }
    }
}


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});