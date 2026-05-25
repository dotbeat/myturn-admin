import { gql } from "@apollo/client";

export const CREATE_ADDITIONAL_SCOUT_TICKET = gql`
  mutation CreateAdditionalScoutTicket(
    $input: CreateAdditionalScoutTicketInput!
  ) {
    createAdditionalScoutTicket(input: $input) {
      id
      companyId
      companyName
      totalCount
      usedCount
      remainingCount
      expiredAt
      createdAt
    }
  }
`;
