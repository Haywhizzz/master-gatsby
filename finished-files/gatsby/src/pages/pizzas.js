import React from 'react';
import { graphql } from 'gatsby';
import ToppingsFilter from '../components/ToppingsFilter';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  return (
    <>
      <SEO
        title={`${
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }`}
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
