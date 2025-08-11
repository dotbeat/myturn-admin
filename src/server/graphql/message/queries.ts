import { gql } from '@apollo/client';

export const GET_ADMIN_MESSAGES = gql`
  query GetAdminMessages($input: GetAdminMessagesInput!) {
    getAdminMessages(input: $input) {
      items {
        id
        content
        type
        isRead
        createdAt
        updatedAt
        entryId
        user {
          id
          firstName
          lastName
          avatarUrl
          university
          faculty
        }
        company {
          id
          name
          iconImageUrl
        }
        entryUser {
          id
          firstName
          lastName
          avatarUrl
          university
          faculty
        }
        job {
          id
          title
          jobHeader
          industry
          jobType
          company {
            id
            name
            iconImageUrl
          }
        }
      }
      totalCount
      page
      limit
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;
