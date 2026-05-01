import { gql } from "@apollo/client";

export const UPDATE_COMPANY_ACCEPT_TICKET = gql`
  mutation UpdateCompanyAcceptTicket($input: UpdateCompanyAcceptTicketInput!) {
    updateCompanyAcceptTicket(input: $input) {
      id
      count
      expiredAt
      amount
    }
  }
`;

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
