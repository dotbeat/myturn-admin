import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Container, Divider, Typography } from "@mui/material";
import {
  availableDaysPerWeeks,
  availableDurationMonths,
  availableHoursPerWeeks,
  genders,
  schoolDepartments,
  schoolGrades,
  schoolGraduationYears,
} from "@/const/user";
import { serverQuery } from "@/server/graphql/queries";
import { GET_USER } from "@/server/graphql/user/queries";
import { UserDetail } from "@/types/user";
import { getSelectItem } from "@/utils/shared/select";
import PageTitle from "@/components/common/PageTitle";
import Avatar from "@/components/common/Avatar";
import UserProfileGroup from "@/components/user/UserProfileGroup";
import UserProfileItem from "@/components/user/UserProfileItem";

export const metadata: Metadata = {
  title: "求職者アカウント詳細 - myturn管理",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = parseInt(resolvedParams.id, 10);

  let user: UserDetail | undefined;
  try {
    const data = await serverQuery(GET_USER, { id: userId });
    if (data?.user) {
      user = {
        ...data.user,
        gender: getSelectItem(genders, data.user.gender)?.label ?? "",
        birthDate: data.user.birthDate
          ? new Date(data.user.birthDate).toLocaleDateString("ja", {
              dateStyle: "long",
            })
          : "",
        department:
          getSelectItem(schoolDepartments, data.user.department)?.label ?? "",
        grade: getSelectItem(schoolGrades, data.user.grade)?.label ?? "",
        graduationYear:
          getSelectItem(schoolGraduationYears, data.user.graduationYear)
            ?.label ?? "",
        availableDaysPerWeek:
          getSelectItem(availableDaysPerWeeks, data.user.availableDaysPerWeek)
            ?.label ?? "",
        availableHoursPerWeek:
          getSelectItem(availableHoursPerWeeks, data.user.availableHoursPerWeek)
            ?.label ?? "",
        availableDurationMonths:
          getSelectItem(
            availableDurationMonths,
            data.user.availableDurationMonths,
          )?.label ?? "",
        interestedIndustries: data.user.interestedIndustries.join("、") || "",
        interestedJobTypes: data.user.interestedJobTypes.join("、") || "",
      };
    }
  } catch (error) {
    console.error("求職者情報の取得中にエラーが発生しました:", error);
    return (
      <div className="flex-1 p-8 text-center">
        <h2 className="mb-4 text-xl font-bold">エラーが発生しました</h2>
        <p>
          求職者情報の取得中に問題が発生しました。しばらくしてからもう一度お試しください。
        </p>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <Container className="max-w-4xl flex-1 px-8 py-6 [word-break:break-word]">
      <PageTitle className="mb-8">求職者アカウント詳細</PageTitle>
      <Box className="bg-[var(--background)] px-4 pb-10 pt-5">
        <Box className="mb-2 flex min-h-32 items-center gap-4">
          <Avatar src={user.avatarUrl} size={96} />
          <Box>
            <Box className="mb-2 flex items-start gap-x-4 gap-y-1 max-md:flex-col md:items-center">
              <Typography variant="h1" className="text-2xl font-semibold">
                {user.lastName}
                {user.firstName}
              </Typography>
            </Box>
            <Typography className="mb-1 text-[var(--myturn-sub-text)]">
              {`${user.university}・${user.faculty} ${user.department}`}
            </Typography>
          </Box>
        </Box>
        <Divider className="-mx-4 mb-8 border-[var(--myturn-sub-text)]" />
        <UserProfileGroup heading="基本情報" className="mb-8">
          <Box className="flex items-center gap-8">
            <UserProfileItem headline="姓" className="min-w-32">
              <Typography className="text-lg">{user.lastName}</Typography>
            </UserProfileItem>
            <UserProfileItem headline="名">
              <Typography className="text-lg">{user.firstName}</Typography>
            </UserProfileItem>
          </Box>
          <UserProfileItem headline="性別">
            <Typography className="text-lg">{user.gender}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="生年月日">
            <Typography className="text-lg">{user.birthDate}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="都道府県">
            <Typography className="text-lg">{user.prefecture}</Typography>
          </UserProfileItem>
        </UserProfileGroup>
        <UserProfileGroup heading="在籍学校" className="mb-8">
          <UserProfileItem headline="学校">
            <Typography className="text-lg">{user.university}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="学部・学科">
            <Typography className="text-lg">{user.faculty}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="学科系統">
            <Typography className="text-lg">{user.department}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="学年">
            <Typography className="text-lg">{user.grade}</Typography>
          </UserProfileItem>
          <UserProfileItem headline="卒業予定年度">
            <Typography className="text-lg">{user.graduationYear}</Typography>
          </UserProfileItem>
        </UserProfileGroup>
        <UserProfileGroup heading="勤務条件" className="mb-8">
          <UserProfileItem headline="出勤可能日数">
            <Typography className="text-lg">
              {user.availableDaysPerWeek}
            </Typography>
          </UserProfileItem>
          <UserProfileItem headline="稼働時間">
            <Typography className="text-lg">
              {user.availableHoursPerWeek}
            </Typography>
          </UserProfileItem>
          <UserProfileItem headline="継続可能期間">
            <Typography className="text-lg">
              {user.availableDurationMonths}
            </Typography>
          </UserProfileItem>
        </UserProfileGroup>
        <UserProfileGroup heading="興味関心" className="mb-8">
          <UserProfileItem headline="興味のある業界">
            <Typography className="text-lg">
              {user.interestedIndustries}
            </Typography>
          </UserProfileItem>
          <UserProfileItem headline="興味のある職種">
            <Typography className="text-lg">
              {user.interestedJobTypes}
            </Typography>
          </UserProfileItem>
        </UserProfileGroup>
        <UserProfileGroup heading="自己紹介">
          <UserProfileItem headline="自己PR">
            {user.selfPR?.split("\n").map((line, i) => (
              <Typography key={i} className="text-lg">
                {line + "\u200B"}
              </Typography>
            ))}
          </UserProfileItem>
          <UserProfileItem headline="今後やりたいこと">
            {user.futureGoals?.split("\n").map((line, i) => (
              <Typography key={i} className="text-lg">
                {line + "\u200B"}
              </Typography>
            ))}
          </UserProfileItem>
        </UserProfileGroup>
      </Box>
    </Container>
  );
}
