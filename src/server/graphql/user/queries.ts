import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      items {
        id
        avatarUrl
        lastName
        firstName
        prefecture
        university
        faculty
        department
        grade
        availableDaysPerWeek
        availableHoursPerWeek
        availableDurationMonths
        entryCount
        createdAt
        deletedAt
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

export const GET_USERS_STATISTICS = gql`
  query GetUsersStatistics($input: GetUsersStatisticsInput!) {
    getUsersStatistics(input: $input) {
      totalCount
      applicantCount
      acceptedCount
      leavedCount
    }
  }
`;

// ユーザー情報を取得するクエリ
export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      lastName
      firstName
      avatarUrl
      university
      faculty
      department
      gender
      birthDate
      prefecture
      email
      phoneNumber
      grade
      graduationYear
      availableDaysPerWeek
      availableHoursPerWeek
      availableDurationMonths
      interestedIndustries
      interestedJobTypes
      selfPR
      futureGoals
      applicantNote
    }
  }
`;
