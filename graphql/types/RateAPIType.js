import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

const RateType = new GraphQLObjectType({
  name: 'RateType',
  fields: {
    USD: {
      type: GraphQLFloat
    },
    CAD: {
      type: GraphQLFloat
    },
    IDR: {
      type: GraphQLFloat
    },
    GBP: {
      type: GraphQLFloat
    },
    CHF: {
      type: GraphQLFloat
    },
    SGD: {
      type: GraphQLFloat
    },
    INR: {
      type: GraphQLFloat
    },
    MYR: {
      type: GraphQLFloat
    },
    JPY: {
      type: GraphQLFloat
    },
    KRW: {
      type: GraphQLFloat
    }
  }
});

const RateAPIType = new GraphQLObjectType({
  name: 'RateAPIType',
  fields: {
    date: {
      type: GraphQLString,
    },
    base: {
      type: GraphQLString,
    },
    rates: {
      type: RateType,
    }
  }
});

export default RateAPIType;
