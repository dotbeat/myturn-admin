import { gql } from "@apollo/client";

export const GET_ADDITIONAL_SCOUT_TICKETS = gql`
  query GetAdditionalScoutTickets($input: SearchAdditionalScoutTicketsInput!) {
    getAdditionalScoutTickets(input: $input) {
      items {
        id
        companyId
        companyName
        totalCount
        usedCount
        remainingCount
        expiredAt
        createdAt
      }
      totalCount
      totalPages
      page
      limit
    }
  }
`;
