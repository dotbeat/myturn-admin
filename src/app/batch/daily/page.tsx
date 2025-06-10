import { BATCH_DAILY } from "@/server/graphql/batch/mutations";
import { serverMutation } from "@/server/graphql/queries";

export default async function Page() {
  try {
    await serverMutation(BATCH_DAILY);
  } catch (error) {
    console.error("日次バッチ処理中にエラーが発生しました:", error);
    return (
      <div className="flex-1 p-8 text-center">
        <h2 className="mb-4 text-xl font-bold">エラーが発生しました</h2>
        <p className="mb-4">日次バッチ処理中にエラーが発生しました。</p>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return <p className="flex-1 p-8 text-center">バッチ処理が完了しました。</p>;
}
