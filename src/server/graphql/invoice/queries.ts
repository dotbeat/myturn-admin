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

export const GET_COMPANY_INVOICE_STATISTICS = gql`
  query GetCompanyInvoicesStatistics(
    $input: GetCompanyInvoicesStatisticsInput!
  ) {
    getCompanyInvoicesStatistics(input: $input) {
      totalAmount
      acceptedCount
      generalCount
      technicalCount
    }
  }
`;
