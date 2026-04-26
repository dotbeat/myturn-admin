import { gql } from "@apollo/client";

export const CREATE_COMPANY_ACCEPT_TICKET = gql`
  mutation CreateCompanyAcceptTicket($input: CreateCompanyAcceptTicketInput!) {
    createCompanyAcceptTicket(input: $input) {
      id
      companyId
      count
      expiredAt
      amount
      createdAt
    }
  }
`;
