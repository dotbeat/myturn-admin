import { gql } from "@apollo/client";

export const UPDATE_COMPANY_INVOICE = gql`
  mutation UpdateCompanyInvoice($input: UpdateCompanyInvoiceInput!) {
    updateCompanyInvoice(input: $input) {
      id
      amount
    }
  }
`;

export const GUARANTEE_COMPANY_INVOICE = gql`
  mutation GuaranteeCompanyInvoice($invoiceId: Int!) {
    guaranteeCompanyInvoice(invoiceId: $invoiceId) {
      id
      amount
    }
  }
`;
