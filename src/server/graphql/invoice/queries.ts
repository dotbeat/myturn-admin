import { gql } from "@apollo/client";

export const SEARCH_COMPANY_INVOICE = gql`
  query GetCompanyInvoices($input: GetCompanyInvoicesInput!) {
    getCompanyInvoices(input: $input) {
      items {
        id
        companyName
        entryId
        userId
        applicantName
        acceptDate
        paymentLimitDate
        service
        amount
      }
      limit
      page
      totalCount
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_COMPANIES_STATISTICS = gql`
  query GetCompaniesStatistics($input: GetCompaniesStatisticsInput!) {
    getCompaniesStatistics(input: $input) {
      totalCount
      postedCount
      acceptedCount
      leavedCount
    }
  }
`;
