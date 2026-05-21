import { gql } from "@apollo/client";

export const UPDATE_COMPANY_AGENT_PLAN_AMOUNT = gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      agentPlanAmount
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

export const DELETE_COMPANY_ACCEPT_TICKET = gql`
  mutation DeleteCompanyAcceptTicket($input: DeleteCompanyAcceptTicketInput!) {
    deleteCompanyAcceptTicket(input: $input) {
      id
    }
  }
`;
